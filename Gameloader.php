<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetra's Flash Games Corner</title>
    <style>
        body {
            background-image: url("assets/BG.jpg");
            z-index: 0;
            margin: 0; 
        }

        .fire-background {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px; 
            background-image: url("assets/fire.gif");
            background-repeat: repeat-x;  
            background-size: auto 100%;   
            z-index: 2; 
        }

        .layer {
            position: absolute;
            z-index: 1; 
        }
        #ruffle{
            width:827px;
            height:655px;

        }
    </style>
</head>
<body>
    <div class="layer" style="width: 323px; height: 100px; left: 465px; top: 20px;" id="logo-container">
        <img id="logo" src="./assets/Tetra.png" alt="Tetra Logo"/>
    </div>
    
    <div class="layer" style="width: 100px; height: 100px; left: 466px; top: 119px;" id="home-button">
        <a href="../../index.php">
            <img src="assets/home.png" alt="Home" height="65" width="70" />
        </a>
    </div>
    
    <div class="layer" style="width: 70px; height: 65px; left: 539px; top: 119px;" id="game-button">
        <a href="flashcorner.php">
            <img src="assets/Game.png" alt="Game" height="65" width="70" />
        </a>
    </div>
    
    <div class="fire-background"></div>
    
    <div class="layer" style="width: 65px; height: 67px; left: 611px; top: 118px;">
        <img src="assets/add.png" alt="Add" height="65" width="70" />
    </div>
        
    <div class="layer" style="width: 78px; height: 67px; left: 685px; top: 119px;" id="plus-icon">
        <img src="assets/plus.png" alt="Plus" height="65" width="70" />
    </div>
        
    <div class="layer" style="width: 166px; height: 268px; left: 111px; top: -13px;" id="left-pillar">
        <img src="assets/pillar.png" alt="Pillar" height="1457" />
    </div>
        
    <div class="layer" style="width: 166px; height: 268px; left: 1430px; top: -13px;" id="right-pillar">
        <img src="assets/pillar.png" alt="Pillar" height="1467" />
    </div>
    <div style="position: absolute; width: 100px; height: 100px; z-index: 1; left: 465px; top: 252px;" id="layer1">
		<img src="assets/Frame1.png" alt="" height="1238" /></div>
    <div style="position: absolute; width: 371px; height: 22px; z-index: 1; left: 494px; top: 955px;" id="layer1"></div>

    <div id="layer2" style="position: absolute; width: 362px; height: 249px; z-index: 3; left: 499px; top: 1034px">
	</div>
	
	
    <div id="300x300" style="position: absolute; width: 300px; height: 300px; z-index: 4; left: 888px; top: 924px">
	</div>
	<div style="position: absolute; width: 400px; height: 226px; z-index: 1; left: 888px; top: 1244px;" id="400x226"></div>
	<div style="position: absolute; width: 145px; height: 625px; z-index: 1; left: 1211px; top: 285px;" id="ad"></div>
	
    <!-- FLASH FILE BEGINS HERE-->
    <div style="position: absolute; width: 678px; height: 624px; z-index: 1; left: 495px; top: 286px;" id="ruffleemu">
        <?php
            $game_folders = scandir("Games");
            if ($game_folders === false) {   
                die("The 'Games' directory does not exist.");
            }
            if (isset($_POST['game_folder'])) {
                $game_folder = $_POST['game_folder'];
                if (in_array($game_folder, $game_folders) && $game_folder != "." && $game_folder != "..") {
                    
                    $swf_file = sprintf("Games/%s/Game.swf", $game_folder);

                    if (file_exists($swf_file)) { 
                        echo(<<<MULTILINESTRING
                            <div id="ruffle"></div> 
                            <script src="ruffle/ruffle.js"></script>
                            <script>
                                var swfobject = {};

                                swfobject.embedSWF = function(url, cont, width, height) {
                                    var ruffle = window.RufflePlayer.newest();
                                    var player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
                                        width: width, 
                                        height: height, 
                                        style: 'width:' + width + 'px; height: ' + height + 'px',
                                    });
                                    player.load({url: url});
                                }
                                
                                // Embed the SWF file for the selected game
                                swfobject.embedSWF("{$swf_file}", "ruffle", 678, 624);
                            </script>
                        MULTILINESTRING);
                    } else {
                        echo "The game file does not exist in the selected folder.";
                    }
                } else {
                    echo "Invalid game folder selected.";
                }
            }
        ?>
    </div>


    <!-- FLASH FILE ENDS HERE-->
    
</body>

</html>
