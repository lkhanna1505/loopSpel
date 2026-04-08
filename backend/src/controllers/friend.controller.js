const { readData, writeData } = require("../utils/fileDB");

const addFriend = (req, res) => {
    const userId = req.user;
    const { friendId } = req.body;

    let friends = readData("friends.json");

    const exists = friends.find(
        (f) => f.userId === userId && f.friendId === friendId
    );

    if (exists) {
        return res.json({ message: "Already friends" });
    }

    friends.push({ userId, friendId });
    friends.push({ userId: friendId, friendId: userId });

    writeData("friends.json", friends);

    res.json({ message: "Friend added" });
};

const getFriends = (req, res) => {
    const userId = req.user;

    const friends = readData("friends.json");

    const myFriends = friends
        .filter((f) => f.userId === userId)
        .map((f) => f.friendId);

    res.json(myFriends);
};

module.exports = { addFriend, getFriends };