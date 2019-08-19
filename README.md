# JS13K2019

##### Running:
Running from source is as simple as spinning up a webserver with the index.html at the root. Easiest way would be with NPM, go to the project /src directory and run "http-server" then go to the given port on localhost in your browser.

##### Building:
To build a final index.html. You need to have a version of Google Closure Compiler (The Java version), and NodeJS. Make sure the Compiler version written in the compile.js script is the same as the version you have. Then, while in the project directory, open a Terminal and run "node compile.js". Let it do it's magic, and viola, there will be a new index.html in the /bin folder.

#### Working Mockup:
<img src="/images/workingmockup.png" width="100%"/>

#### Summary:
The basic game concept is a mix of Tiny Wings, Luftrausers and Robin Hood. The player plays as a robin (the bird) and must use the hills to propel themselves into the sky, where they can shoot arrows at enemy birds (like blackbirds, because they like taking shiny things!) to make them drop their gold. The player must collect as much gold as they can in a time limit then go back to the start (Sherwood Forest), along the same level. The objective is to gain score/renown, and complete achievements.

#### Levels:
Levels are procedurally generated. The difficulty of each level can be determined by the terrain, number of enemies, number of passive obstacles, availability and scarceness of boosts, and the time limit. The levels could wrap around, making them seamless: This would make it easier for the player to find/return to the start point, and could provide a graphical bonus in showing another part of the level as part of the background (a parallax layer).


#### Physics:
While in the air, the player is able to nose dive (by boosting while aiming down). This allows them to gain speed, and is the only way to gain maximum speed. The goal is to land as parallel as possible onto a slope, the player will then slide down the slope and up the next slope without loosing speed. Landing onto a slope at a perpendicular angle (or "head on") should cause the player to lose the level/a life.
![alt text](/images/hillmovement.png "Hill physics")
In the air, the player has two modes;free fall and boost. Free fall physics are as follows: Going up reduces speed the most, going left/right reduces speed moderately, going down increases speed (up to some terminal velocity). When boosting, the player can gain a bit of speed in all the directions, scaled by the freefall variables (so boosting down will hit maximum speed). Boost is limited though, and has to be replenished by landing on the slopes, the better than landing, the better the boost refill.
![alt text](/images/skymovement.png "Sky physics")
