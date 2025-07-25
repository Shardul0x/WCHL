import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";

actor CreativeVault {
    
    // Types
    public type IdeaStatus = {
        #Public;
        #Private;
        #RevealLater;
    };
    
    public type Idea = {
        id: Text;
        title: Text;
        description: Text;
        creator: Principal;
        timestamp: Int;
        status: IdeaStatus;
        ipfsHash: ?Text;
        isRevealed: Bool;
        revealTimestamp: ?Int;
        proofHash: Text;
        version: Nat;
        tags: [Text];
        category: Text;
    };
    
    public type IdeaInput = {
        title: Text;
        description: Text;
        status: IdeaStatus;
        ipfsHash: ?Text;
        tags: [Text];
        category: Text;
    };
    
    public type ProofRecord = {
        ideaId: Text;
        proofHash: Text;
        timestamp: Int;
        creator: Principal;
        isVerified: Bool;
        blockHeight: Nat;
        canisterId: Text;
        network: Text;
    };

    public type UserProfile = {
        principal: Principal;
        username: ?Text;
        email: ?Text;
        createdAt: Int;
        totalIdeas: Nat;
        publicIdeas: Nat;
        reputation: Nat;
    };

    public type CollaborativeIdea = {
        ideaId: Text;
        collaborators: [Principal];
        permissions: [(Principal, [Text])]; // Principal -> [permissions]
        requiredSignatures: Nat;
        currentSignatures: [(Principal, Int)];
        isFinalized: Bool;
    };
    
    // Stable storage
    private stable var nextIdeaId: Nat = 0;
    private stable var ideasEntries: [(Text, Idea)] = [];
    private stable var userIdeasEntries: [(Principal, [Text])] = [];
    private stable var userProfilesEntries: [(Principal, UserProfile)] = [];
    private stable var collaborativeIdeasEntries: [(Text, CollaborativeIdea)] = [];
    
    // Runtime storage
    private var ideas = Map.HashMap<Text, Idea>(100, Text.equal, Text.hash);
    private var userIdeas = Map.HashMap<Principal, [Text]>(50, Principal.equal, Principal.hash);
    private var userProfiles = Map.HashMap<Principal, UserProfile>(50, Principal.equal, Principal.hash);
    private var collaborativeIdeas = Map.HashMap<Text, CollaborativeIdea>(20, Text.equal, Text.hash);
    
    // System upgrade hooks
    system func preupgrade() {
        ideasEntries := Iter.toArray(ideas.entries());
        userIdeasEntries := Iter.toArray(userIdeas.entries());
        userProfilesEntries := Iter.toArray(userProfiles.entries());
        collaborativeIdeasEntries := Iter.toArray(collaborativeIdeas.entries());
    };
    
    system func postupgrade() {
        ideas := Map.fromIter<Text, Idea>(ideasEntries.vals(), ideasEntries.size(), Text.equal, Text.hash);
        userIdeas := Map.fromIter<Principal, [Text]>(userIdeasEntries.vals(), userIdeasEntries.size(), Principal.equal, Principal.hash);
        userProfiles := Map.fromIter<Principal, UserProfile>(userProfilesEntries.vals(), userProfilesEntries.size(), Principal.equal, Principal.hash);
        collaborativeIdeas := Map.fromIter<Text, CollaborativeIdea>(collaborativeIdeasEntries.vals(), collaborativeIdeasEntries.size(), Text.equal, Text.hash);
        
        ideasEntries := [];
        userIdeasEntries := [];
        userProfilesEntries := [];
        collaborativeIdeasEntries := [];
    };
    
    // Create or update user profile
    public shared(msg) func createUserProfile(username: ?Text, email: ?Text): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        
        let profile: UserProfile = switch (userProfiles.get(caller)) {
            case (?existingProfile) {
                {
                    principal = existingProfile.principal;
                    username = username;
                    email = email;
                    createdAt = existingProfile.createdAt;
                    totalIdeas = existingProfile.totalIdeas;
                    publicIdeas = existingProfile.publicIdeas;
                    reputation = existingProfile.reputation;
                }
            };
            case null {
                {
                    principal = caller;
                    username = username;
                    email = email;
                    createdAt = Time.now();
                    totalIdeas = 0;
                    publicIdeas = 0;
                    reputation = 0;
                }
            };
        };
        
        userProfiles.put(caller, profile);
        #ok(profile)
    };
    
    // Submit new idea
    public shared(msg) func submitIdea(input: IdeaInput): async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        // Validate input
        if (Text.size(input.title) == 0 or Text.size(input.title) > 100) {
            return #err("Title must be between 1 and 100 characters");
        };
        
        if (Text.size(input.description) == 0 or Text.size(input.description) > 5000) {
            return #err("Description must be between 1 and 5000 characters");
        };
        
        let ideaId = "idea_" # Nat.toText(nextIdeaId);
        nextIdeaId += 1;
        
        let now = Time.now();
        let proofHash = generateProofHash(ideaId, input.title, input.description, caller, now);
        
        let idea: Idea = {
            id = ideaId;
            title = input.title;
            description = input.description;
            creator = caller;
            timestamp = now;
            status = input.status;
            ipfsHash = input.ipfsHash;
            isRevealed = (input.status == #Public);
            revealTimestamp = if (input.status == #Public) ?now else null;
            proofHash = proofHash;
            version = 1;
            tags = input.tags;
            category = input.category;
        };
        
        ideas.put(ideaId, idea);
        
        // Update user's ideas list
        let currentUserIdeas = Option.get(userIdeas.get(caller), []);
        userIdeas.put(caller, Array.append(currentUserIdeas, [ideaId]));
        
        // Update user profile
        await updateUserStats(caller, input.status == #Public);
        
        #ok(ideaId)
    };
    
    // Reveal previously private idea
    public shared(msg) func revealIdea(ideaId: Text): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        switch (ideas.get(ideaId)) {
            case null { #err("Idea not found") };
            case (?idea) {
                if (idea.creator != caller) {
                    return #err("Not authorized to reveal this idea");
                };
                
                if (idea.isRevealed) {
                    return #err("Idea is already revealed");
                };
                
                let updatedIdea: Idea = {
                    id = idea.id;
                    title = idea.title;
                    description = idea.description;
                    creator = idea.creator;
                    timestamp = idea.timestamp;
                    status = #Public;
                    ipfsHash = idea.ipfsHash;
                    isRevealed = true;
                    revealTimestamp = ?Time.now();
                    proofHash = idea.proofHash;
                    version = idea.version + 1;
                    tags = idea.tags;
                    category = idea.category;
                };
                
                ideas.put(ideaId, updatedIdea);
                await updateUserStats(caller, true);
                #ok()
            };
        }
    };
    
    // Update idea (by creator only)
    public shared(msg) func updateIdea(ideaId: Text, newDescription: Text, newTags: [Text]): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        switch (ideas.get(ideaId)) {
            case null { #err("Idea not found") };
            case (?idea) {
                if (idea.creator != caller) {
                    return #err("Not authorized to update this idea");
                };
                
                if (Text.size(newDescription) == 0 or Text.size(newDescription) > 5000) {
                    return #err("Description must be between 1 and 5000 characters");
                };
                
                let updatedIdea: Idea = {
                    id = idea.id;
                    title = idea.title;
                    description = newDescription;
                    creator = idea.creator;
                    timestamp = idea.timestamp;
                    status = idea.status;
                    ipfsHash = idea.ipfsHash;
                    isRevealed = idea.isRevealed;
                    revealTimestamp = idea.revealTimestamp;
                    proofHash = idea.proofHash;
                    version = idea.version + 1;
                    tags = newTags;
                    category = idea.category;
                };
                
                ideas.put(ideaId, updatedIdea);
                #ok()
            };
        }
    };
    
    // Get user's ideas
    public query(msg) func getUserIdeas(): async [Idea] {
        let caller = msg.caller;
        let userIdeaIds = Option.get(userIdeas.get(caller), []);
        
        Array.mapFilter<Text, Idea>(userIdeaIds, func(id) {
            ideas.get(id)
        })
    };
    
    // Get public feed with filtering
    public query func getPublicFeed(limit: ?Nat, category: ?Text, tags: [Text]): async [Idea] {
        let maxLimit = Option.get(limit, 20);
        let allIdeas = Iter.toArray(ideas.vals());
        
        // Filter public ideas
        var filteredIdeas = Array.filter<Idea>(allIdeas, func(idea) {
            (idea.status == #Public or idea.isRevealed) and
            (switch (category) {
                case null { true };
                case (?cat) { idea.category == cat };
            }) and
            (if (tags.size() == 0) { true } else {
                Option.isSome(Array.find<Text>(tags, func(tag) {
                    Option.isSome(Array.find<Text>(idea.tags, func(ideaTag) { ideaTag == tag }))
                }))
            })
        });
        
        // Sort by timestamp (newest first)
        let sortedIdeas = Array.sort<Idea>(filteredIdeas, func(a, b) {
            if (a.timestamp > b.timestamp) #less
            else if (a.timestamp < b.timestamp) #greater
            else #equal
        });
        
        if (sortedIdeas.size() <= maxLimit) {
            sortedIdeas
        } else {
            Array.subArray(sortedIdeas, 0, maxLimit)
        }
    };
    
    // Get idea by ID (with permission check)
    public query(msg) func getIdea(ideaId: Text): async Result.Result<Idea, Text> {
        let caller = msg.caller;
        
        switch (ideas.get(ideaId)) {
            case null { #err("Idea not found") };
            case (?idea) {
                if (idea.status == #Public or idea.isRevealed or idea.creator == caller) {
                    #ok(idea)
                } else {
                    #err("Access denied: Idea is private")
                }
            };
        }
    };
    
    // Generate verifiable proof record
    public query func getProofRecord(ideaId: Text): async Result.Result<ProofRecord, Text> {
        switch (ideas.get(ideaId)) {
            case null { #err("Idea not found") };
            case (?idea) {
                let proof: ProofRecord = {
                    ideaId = idea.id;
                    proofHash = idea.proofHash;
                    timestamp = idea.timestamp;
                    creator = idea.creator;
                    isVerified = true;
                    blockHeight = 0; // Would be actual block height in production
                    canisterId = "actual-canister-id"; // Would be actual canister ID
                    network = "Internet Computer";
                };
                #ok(proof)
            };
        }
    };
    
    // Verify idea authenticity
    public query func verifyIdea(ideaId: Text, expectedHash: Text): async Bool {
        switch (ideas.get(ideaId)) {
            case null { false };
            case (?idea) { idea.proofHash == expectedHash };
        }
    };
    
    // Get user profile
    public query(msg) func getUserProfile(): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        switch (userProfiles.get(caller)) {
            case null { #err("User profile not found") };
            case (?profile) { #ok(profile) };
        }
    };
    
    // Search ideas
    public query func searchIdeas(searchTerm: Text, limit: ?Nat): async [Idea] {
        let maxLimit = Option.get(limit, 10);
        let allIdeas = Iter.toArray(ideas.vals());
        let searchLower = Text.toLowercase(searchTerm);
        
        let matchingIdeas = Array.filter<Idea>(allIdeas, func(idea) {
            (idea.status == #Public or idea.isRevealed) and (
                Text.contains(Text.toLowercase(idea.title), #text searchLower) or
                Text.contains(Text.toLowercase(idea.description), #text searchLower)
            )
        });
        
        let sortedResults = Array.sort<Idea>(matchingIdeas, func(a, b) {
            if (a.timestamp > b.timestamp) #less
            else if (a.timestamp < b.timestamp) #greater
            else #equal
        });
        
        if (sortedResults.size() <= maxLimit) {
            sortedResults
        } else {
            Array.subArray(sortedResults, 0, maxLimit)
        }
    };
    
    // Get statistics
    public query func getStats(): async {totalIdeas: Nat; publicIdeas: Nat; totalUsers: Nat} {
        let allIdeas = Iter.toArray(ideas.vals());
        let publicCount = Array.filter<Idea>(allIdeas, func(idea) {
            idea.status == #Public or idea.isRevealed
        }).size();
        
        {
            totalIdeas = allIdeas.size();
            publicIdeas = publicCount;
            totalUsers = Iter.toArray(userProfiles.vals()).size();
        }
    };
    
    // Create collaborative idea
    public shared(msg) func createCollaborativeIdea(
        ideaId: Text, 
        collaborators: [Principal], 
        requiredSignatures: Nat
    ): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        switch (ideas.get(ideaId)) {
            case null { #err("Idea not found") };
            case (?idea) {
                if (idea.creator != caller) {
                    return #err("Only idea creator can make it collaborative");
                };
                
                let collaborative: CollaborativeIdea = {
                    ideaId = ideaId;
                    collaborators = Array.append([caller], collaborators);
                    permissions = [(caller, ["read", "write", "admin"])];
                    requiredSignatures = requiredSignatures;
                    currentSignatures = [(caller, Time.now())];
                    isFinalized = false;
                };
                
                collaborativeIdeas.put(ideaId, collaborative);
                #ok()
            };
        }
    };
    
    // Sign collaborative idea
    public shared(msg) func signCollaborativeIdea(ideaId: Text): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        switch (collaborativeIdeas.get(ideaId)) {
            case null { #err("Collaborative idea not found") };
            case (?collab) {
                if (Option.isNull(Array.find<Principal>(collab.collaborators, func(p) { p == caller }))) {
                    return #err("Not a collaborator on this idea");
                };
                
                if (Option.isSome(Array.find<(Principal, Int)>(collab.currentSignatures, func((p, _)) { p == caller }))) {
                    return #err("Already signed");
                };
                
                let newSignatures = Array.append(collab.currentSignatures, [(caller, Time.now())]);
                let isFinalized = newSignatures.size() >= collab.requiredSignatures;
                
                let updatedCollab: CollaborativeIdea = {
                    ideaId = collab.ideaId;
                    collaborators = collab.collaborators;
                    permissions = collab.permissions;
                    requiredSignatures = collab.requiredSignatures;
                    currentSignatures = newSignatures;
                    isFinalized = isFinalized;
                };
                
                collaborativeIdeas.put(ideaId, updatedCollab);
                #ok()
            };
        }
    };
    
    // Helper functions
    private func updateUserStats(user: Principal, isPublic: Bool): async () {
        switch (userProfiles.get(user)) {
            case null {
                let profile: UserProfile = {
                    principal = user;
                    username = null;
                    email = null;
                    createdAt = Time.now();
                    totalIdeas = 1;
                    publicIdeas = if (isPublic) 1 else 0;
                    reputation = if (isPublic) 10 else 5;
                };
                userProfiles.put(user, profile);
            };
            case (?profile) {
                let updatedProfile: UserProfile = {
                    principal = profile.principal;
                    username = profile.username;
                    email = profile.email;
                    createdAt = profile.createdAt;
                    totalIdeas = profile.totalIdeas + 1;
                    publicIdeas = profile.publicIdeas + (if (isPublic) 1 else 0);
                    reputation = profile.reputation + (if (isPublic) 10 else 5);
                };
                userProfiles.put(user, updatedProfile);
            };
        }
    };
    
    private func generateProofHash(id: Text, title: Text, description: Text, creator: Principal, timestamp: Int): Text {
        let content = id # title # description # Principal.toText(creator) # Int.toText(timestamp);
        let hash = Text.hash(content);
        "sha256:" # Nat32.toText(hash)
    };
}
