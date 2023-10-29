import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor DBank {
    type User = {
        username: Text;
        password: Text;
        balance: Float;
    };
    
    var users: HashMap.HashMap<Text, User> = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);

    var currentUser: ?User = null;

    public func createUser(username: Text, password: Text) : async Text {
    if (users.get(username) != null) {
        return "User already exists!";
    } else {
        let newUser: User = {
            username = username;
            password = password;
            balance = 0.0;
        };
        users.put(username, newUser);
        return "Account successfully created!";
    }
}


    ; public func loginUser(username: Text, password: Text) : async Text {
        switch (users.get(username)) {
            case (null) { return "User not found!"; };
            case (?user) {
                if (user.password == password) {
                    currentUser := ?user;
                    return "Login successful!";
                } else {
                    return "Incorrect password!";
                }
            };
        };
    }

    ; public func logoutUser() : async () {
        currentUser := null;
    }

    ; public func topUp(amount: Float) : async Text {
    switch (currentUser) {
        case (null) { return "Please login first."; };
        case (?user) {
            let updatedUser = {
                username = user.username;
                password = user.password;
                balance = user.balance + amount;
            };
            users.put(user.username, updatedUser); // Update the HashMap
            currentUser := ?updatedUser;
            return "Amount added successfully.";
        };
    };
}

    ; public func withdraw(amount: Float) : async Text {
    switch (currentUser) {
        case (null) { return "Please login first."; };
        case (?user) {
            if (user.balance >= amount) {
                let updatedUser = {
                    username = user.username;
                    password = user.password;
                    balance = user.balance - amount;
                };
                users.put(user.username, updatedUser); // Update the HashMap
                currentUser := ?updatedUser;
                return "Withdrawal successful.";
            } else {
                return "Amount too large to withdraw.";
            }
        };
    };
}


    ; public query func checkBalance() : async Float {
        switch (currentUser) {
            case (null) { return 0.0; };
            case (?user) { return user.balance; };
        };
    }

    // Placeholder for transfer function 
    ; public func transferTo(targetUsername: Text, amount: Float) : async Text {
    switch (currentUser) {
        case (null) { return "Please login first."; };
        case (?user) {
            if (user.balance < amount) {
                return "Insufficient funds for transfer.";
            }

            ; switch (users.get(targetUsername)) {
                case (null) { return "Target user not found."; };
                case (?targetUser) {
                    // Deduct from current user
                    currentUser := ?{
                        username = user.username;
                        password = user.password;
                        balance = user.balance - amount;
                    };

                    // Add to target user
                    let updatedTargetUser: User = {
                        username = targetUser.username;
                        password = targetUser.password;
                        balance = targetUser.balance + amount;
                    };
                    users.put(targetUsername, updatedTargetUser);

                    return "Transfer successful.";
                };
            };
        };
    };
}

}
