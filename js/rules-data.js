// NBA Rules Data for RuleBook Bot
// This contains a simplified subset of NBA rules for demonstration purposes

const rulesData = [
    {
        id: "shotclock-1",
        title: "Shot Clock",
        section: "7.1",
        category: "shotclock",
        page: 21,
        content: "The shot clock shall be 24 seconds in length with a 14-second reset provision. The team in possession must attempt a field goal before the shot clock expires. To constitute a legal field goal attempt, the following conditions must be met: (1) The ball must leave the player's hand prior to the expiration of the shot clock, and (2) after leaving the player's hand(s), the ball must make contact with the rim."
    },
    {
        id: "shotclock-reset",
        title: "Shot Clock Reset",
        section: "7.4",
        category: "shotclock",
        page: 22,
        content: "The shot clock shall be reset to 14 seconds when the ball is knocked out of bounds by the defense, when a defensive player is the last to touch the ball before it goes out of bounds, when a defensive player causes the ball to enter the basket ring below, after a personal foul by the defensive team when the ball is being inbounded in the frontcourt, after a kicking violation by the defensive team, or when the offensive team retains possession after an unsuccessful field goal attempt that contacts the rim."
    },
    {
        id: "timeouts-1",
        title: "Timeout Rules",
        section: "5.6",
        category: "timeout",
        page: 15,
        content: "Each team is entitled to seven (7) charged timeouts during regulation play. Each team is limited to no more than four (4) timeouts in the fourth period. Of the seven timeouts, each team is entitled to two 60-second timeouts and five 30-second timeouts. During overtime periods, each team shall be allowed two (2) 30-second timeouts plus any unused timeouts remaining from regulation play."
    },
    {
        id: "flagrant-foul",
        title: "Flagrant Fouls",
        section: "12.5",
        category: "foul",
        page: 41,
        content: "A flagrant foul is unnecessary and/or excessive contact committed by a player against an opponent. A flagrant foul—penalty (1) is unnecessary contact committed by a player against an opponent. A flagrant foul—penalty (2) is unnecessary and excessive contact committed by a player against an opponent. The difference between the two penalties is in the severity of the contact. Both types of flagrant fouls result in two free throws and possession of the ball. Flagrant foul (2) results in automatic ejection of the offending player."
    },
    {
        id: "clear-path",
        title: "Clear Path to the Basket",
        section: "12.8",
        category: "foul",
        page: 43,
        content: "A clear path foul is defined as a personal foul against any offensive player during a transition scoring opportunity when the ball is ahead of the tip of the circle in the backcourt, no defender is ahead of the offensive player with the ball or able to establish a position between the ball and the basket, and the foul occurs (1) from behind or on the side, (2) in the backcourt or in the frontcourt before the defender who commits the foul has established a position in front of the basket. A clear path foul results in two free throws and possession of the ball on the sideline nearest the point where play was interrupted."
    },
    {
        id: "goaltending",
        title: "Goaltending",
        section: "11.2",
        category: "violation",
        page: 35,
        content: "Goaltending is touching the ball during a field goal attempt while it is on its downward flight, wholly above the rim and has the possibility of entering the basket. Goaltending also occurs when a defensive player touches the ball when it is above the rim during a free throw attempt. If during a field goal attempt, a defensive player touches the ball after it has touched the backboard and is wholly above the rim, regardless of whether it is on its upward or downward flight, it is considered goaltending. A goaltending violation results in the awarding of points to the offensive team as if the field goal had been made."
    },
    {
        id: "traveling",
        title: "Traveling",
        section: "10.4",
        category: "violation",
        page: 31,
        content: "A player who receives the ball while standing still may pivot, using either foot as the pivot foot. A player who gathers the ball while progressing may take (1) two steps in coming to a stop, passing or shooting the ball, or (2) if he has not yet dribbled, one step prior to releasing the ball. A player who gathers the ball while dribbling may take two steps in coming to a stop, passing, or shooting the ball. The first step occurs when a foot, or both feet, touch the floor after gaining control of the ball. The second step occurs after the first step when the other foot touches the floor, or both feet touch the floor simultaneously."
    },
    {
        id: "technical-foul",
        title: "Technical Fouls",
        section: "12.3",
        category: "foul",
        page: 39,
        content: "A technical foul shall be assessed for unsportsmanlike conduct including, but not limited to: (1) disrespectfully addressing an official, (2) physically contacting an official, (3) overt actions indicating resentment to a call, (4) use of profanity, (5) taunting, baiting, or ridiculing an opponent, (6) excessive hanging on the rim, and (7) delay of game violations. A technical foul results in one free throw attempt for the opposing team and possession of the ball. A player receives an automatic ejection upon receiving his second technical foul in the same game."
    },
    {
        id: "substitutions",
        title: "Substitution Procedures",
        section: "5.3",
        category: "substitution",
        page: 14,
        content: "Substitutes may enter the game only during a substitution opportunity. A substitution opportunity occurs when the ball is dead and the clock is stopped, or after the completion of the last free throw in a series. A substitute must remain at the scorer's table until beckoned by an official. Once beckoned, the substitute must enter the game immediately. The player whom the substitute is replacing must go directly to the bench."
    },
    {
        id: "overtime",
        title: "Overtime Periods",
        section: "5.8",
        category: "overtime",
        page: 17,
        content: "If the score is tied at the end of the fourth period, play shall be continued for as many extra five-minute periods as necessary to break the tie. Each overtime period begins with a jump ball at the center circle. Teams shall change baskets for the first overtime period and then alternate each extra period. During overtime periods, each team shall be allowed two (2) 30-second timeouts plus any unused timeouts remaining from regulation play."
    },
    {
        id: "three-second",
        title: "Three-Second Violation",
        section: "10.7",
        category: "violation",
        page: 33,
        content: "An offensive player cannot remain in the free throw lane for more than three consecutive seconds while his team is in control of the ball in the frontcourt. The count starts when the player enters the lane and resets when the player leaves the lane. The count also resets when (1) a player attempts a field goal, (2) the ball is batted away by an opponent, (3) a defensive player gains possession of the ball, or (4) a new 24-second period begins. A three-second violation results in a turnover."
    },
    {
        id: "playoff-rules",
        title: "Playoff Format",
        section: "1.4",
        category: "playoff",
        page: 7,
        content: "The NBA Playoffs consist of four rounds: First Round, Conference Semifinals, Conference Finals, and NBA Finals. All playoff series are best-of-seven, meaning the first team to win four games advances to the next round. In each round, the team with the better regular season record has home-court advantage, meaning they host Games 1, 2, 5, and 7 (if necessary). The other team hosts Games 3, 4, and 6 (if necessary). This 2-2-1-1-1 format is used for all playoff rounds, including the NBA Finals."
    },
    {
        id: "back-court",
        title: "Backcourt Violation",
        section: "10.2",
        category: "violation",
        page: 30,
        content: "Once the ball and both feet of the player in possession have been established in the frontcourt, the team may not intentionally cause the ball to go into the backcourt. If this occurs, it is a backcourt violation and results in a turnover. During throw-ins, the ball is considered in the frontcourt when it is touched by a player who has both feet in the frontcourt. If the ball is first touched by a player with one or both feet in the backcourt, the ball is considered in the backcourt."
    },
    {
        id: "jumpball",
        title: "Jump Ball",
        section: "6.1",
        category: "general",
        page: 18,
        content: "A jump ball occurs at the beginning of the game and each overtime period, and in certain other situations where possession is in question. The ball is tossed up between two opponents by an official. The jumpers may not tap the ball until it reaches its highest point. The jumpers may not leave their half of the jumping circle until the ball has been tapped. All non-jumpers must remain outside the jumping circle until the ball has been tapped. If the tapped ball goes out of bounds and was not touched by a non-jumper, another jump ball is held between the same two players."
    },
    {
        id: "defensive-three",
        title: "Defensive Three-Second Violation",
        section: "10.8",
        category: "violation",
        page: 34,
        content: "A defensive player cannot remain in the free throw lane for more than three consecutive seconds while not actively guarding an opponent. A defensive player must be within arm's length of an offensive player to be considered actively guarding. The count starts when the defensive player enters the lane and resets when (1) the player actively guards an opponent, (2) the player leaves the lane, (3) the ball is deflected or a shot is taken, or (4) a new 24-second period begins. A defensive three-second violation results in a technical foul with one free throw awarded and continued possession for the offensive team."
    },
    {
        id: "shooting-foul",
        title: "Shooting Fouls",
        section: "12.2",
        category: "foul",
        page: 38,
        content: "A shooting foul occurs when a defender makes illegal contact with a shooter during the act of shooting. If the shot is successful, the basket counts and one free throw is awarded. If the shot is unsuccessful, two free throws are awarded, or three free throws if the shot was attempted from beyond the three-point line. If a shooting foul occurs after time expires at the end of a period, the free throws shall be attempted immediately, as if the foul had occurred during playing time."
    },
    {
        id: "game-length",
        title: "Game Length",
        section: "5.1",
        category: "general",
        page: 13,
        content: "NBA games consist of four quarters of 12 minutes each, with a 15-minute halftime interval between the second and third quarters. There is a break of 2 minutes and 30 seconds between the first and second quarters and between the third and fourth quarters. If the score is tied at the end of the fourth quarter, overtime periods of 5 minutes each are played until a winner is determined. There is a break of 2 minutes and 30 seconds between the fourth quarter and overtime, and between each overtime period."
    }
];