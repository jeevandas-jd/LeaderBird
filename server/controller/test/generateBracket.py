import math

class Round:
    def __init__(self, roundNo):
        self.matches = []
        self.result = []
        self.noMatches = 0
        self.roundNo = roundNo
        self.winners = []

    def updateResult(self, matchNo, result):
        self.result.append(result)
        a, b = result
        if a > b:
            self.winners.append(self.matches[matchNo][0])
        else:
            self.winners.append(self.matches[matchNo][1])


class Bracket:
    def __init__(self, teams):
        self.teams = teams
        self.rounds = []
        self.noRounds = math.ceil(math.log2(len(self.teams)))

        # Ensure power of 2 teams
        noTeams = len(self.teams)
        if noTeams > 0 and math.log2(noTeams) % 1 != 0:
            nextPowerOfTwo = 2 ** math.ceil(math.log2(noTeams))
            while len(self.teams) < nextPowerOfTwo:
                self.teams.append(f"Dummy Team {len(self.teams) + 1}")

        # Create rounds
        for i in range(self.noRounds):
            self.rounds.append(Round(i + 1))

    def scheduleMatches(self, roundNo):
        if roundNo >= self.noRounds:
            print("No more rounds left.")
            return
        elif roundNo == 0:
            matches = [(self.teams[i], self.teams[i + 1]) for i in range(0, len(self.teams), 2)]
            self.rounds[roundNo].matches = matches
            self.rounds[roundNo].noMatches = len(matches)
        else:
            if not self.rounds[roundNo - 1].winners:
                print("Previous round not completed!")
                return
            matches = [(self.rounds[roundNo - 1].winners[i], self.rounds[roundNo - 1].winners[i + 1]) 
                       for i in range(0, len(self.rounds[roundNo - 1].winners), 2)]
            self.rounds[roundNo].matches = matches
            self.rounds[roundNo].noMatches = len(matches)

    def updateResult(self, roundNo, matchNo, result):
        if roundNo >= len(self.rounds):
            print("Invalid round number.")
            return
        if matchNo >= len(self.rounds[roundNo].matches):
            print("Invalid match number.")
            return
        self.rounds[roundNo].updateResult(matchNo, result)

    def getBracket(self):
        for i in range(self.noRounds):
            self.scheduleMatches(i)
        return self.rounds

    def displayBracket(self):
        print("\nTournament Bracket:")
        for i in range(len(self.rounds)):
            print(f"\nRound {i + 1}:")
            for j, match in enumerate(self.rounds[i].matches):
                print(f"  Match {j + 1}: {match[0]} vs {match[1]}")
        print("\n")


def main():
    teams = []
    bracket = None

    while True:
        print("\n==== Knockout Tournament Menu ====")
        print("1. Enter Teams")
        print("2. View Bracket")
        print("3. scheduleMatches ")
        print("4. Update Match Result")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            teams = input("Enter team names separated by spaces: ").split()
            bracket = Bracket(teams)
            print("Teams have been registered.")

        elif choice == "2":
            if not bracket:
                print("No bracket has been created yet. Please enter teams first.")
            else:
                bracket.displayBracket()
        elif choice == "3":
            if not bracket:
                print("No bracket has been created yet. Please enter teams first.")
                continue
            roundNo = int(input("Enter round number: ")) 
            bracket.scheduleMatches(roundNo)
            print("Matches scheduled!")
        elif choice == "4":
            if not bracket:
                print("No bracket has been created yet. Please enter teams first.")
                continue
            roundNo = int(input("Enter round number: ")) - 1
            matchNo = int(input("Enter match number: ")) - 1
            score1 = int(input(f"Enter score for {bracket.rounds[roundNo].matches[matchNo][0]}: "))
            score2 = int(input(f"Enter score for {bracket.rounds[roundNo].matches[matchNo][1]}: "))
            bracket.updateResult(roundNo, matchNo, (score1, score2))
            print("Result updated!")

        elif choice == "5":
            print("Exiting tournament system. Goodbye!")
            break

        else:
            print("Invalid choice! Please select a valid option.")


if __name__ == "__main__":
    main()

    



