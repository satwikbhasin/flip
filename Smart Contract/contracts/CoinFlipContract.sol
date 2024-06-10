pragma solidity ^0.5.16;

contract CoinFlipContract {
    enum Stage {
        Betting,
        Revealing
    }
    Stage public currentStage;

    address payable public player1;
    address payable public player2;
    uint8 private player1Choice;
    uint8 private player2Choice;
    bool public hasPlayer1Played;
    bool public hasPlayer2Played;
    bool private player1Revealed;
    bool private player2Revealed;
    string public winnerName;

    constructor() public {
        currentStage = Stage.Betting;
        player1 = address(0);
        player2 = address(0);
        player1Choice = 2;
        player2Choice = 2;
        hasPlayer1Played = false;
        hasPlayer2Played = false;
        player1Revealed = false;
        player2Revealed = false;
    }

    modifier onlyPlayers() {
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        _;
    }

    function placeBet(uint8 choice) external payable {
        require(currentStage == Stage.Betting, "Not in betting stage");
        require(choice == 0 || choice == 1, "Invalid choice");
        require(msg.value == 1 ether, "Bet amount must be 1 ETH");

        if (player1 == address(0)) {
            player1 = msg.sender;
            player1Choice = choice;
            hasPlayer1Played = true;
        } else {
            require(player2 == address(0), "Both players have already bet");
            require(
                msg.sender != player1,
                "Player cannot play against themselves"
            );
            player2 = msg.sender;
            player2Choice = choice;
            hasPlayer2Played = true;
            determineWinner();
        }
    }

    function determineWinner() private {
        if (hasPlayer1Played && hasPlayer2Played) {
            currentStage = Stage.Revealing;
        }
        bool player1Wins = (uint256(player1) + uint256(player2)) % 2 == 0;
        if (
            (player1Choice == 0 && player1Wins) ||
            (player1Choice == 1 && !player1Wins)
        ) {
            winnerName = "player1";
            player1.transfer(address(this).balance);
        } else {
            winnerName = "player2";
            player2.transfer(address(this).balance);
        }
    }

    function revealResults() public onlyPlayers {
        require(currentStage == Stage.Revealing, "Not in revealing stage");

        if (msg.sender == player1) {
            player1Revealed = true;
        } else if (msg.sender == player2) {
            player2Revealed = true;
        }

        if (player1Revealed && player2Revealed) {
            resetGame();
        }
    }

    function resetGame() private {
        player1 = address(0);
        player2 = address(0);
        player1Choice = 2;
        player2Choice = 2;
        hasPlayer1Played = false;
        hasPlayer2Played = false;
        player1Revealed = false;
        player2Revealed = false;
        currentStage = Stage.Betting;
        winnerName = "Unknown";
    }
}
