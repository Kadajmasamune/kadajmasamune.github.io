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
        
    <div class="layer" style="width: 166px; height: 268px; left: 202px; top: -13px;" id="left-pillar">
        <img src="assets/pillar.png" alt="Pillar" height="1126" />
    </div>
        
    <div class="layer" style="width: 166px; height: 268px; left: 1425px; top: -13px;" id="right-pillar">
        <img src="assets/pillar.png" alt="Pillar" height="1126" />
    </div>
    
    <?php
        // Sorts Game icons
        $GameFolders = scandir("Games");
        if($GameFolders === false){die("No such dir");}
        $SortedFolders = array();
        $Begin_from_row_x = 461;
        $px_diff_row = 115;
        $End_from_row_x = 1359;
        $Column1 = 261;
        $Column2 = 382;
        $Column3 = 497;
        $Current_X_pos = $Begin_from_row_x;
        $Current_colmn = $Column1;
        foreach ($GameFolders as $Item) {
            if ( $Item == "." || $Item == "..") continue;
            $filehandle = fopen(sprintf("Games/%s/Order.txt", $Item), "r");
            $Order = (int)fread($filehandle, 2);
            fclose($filehandle);
            $SortedFolders[$Order] = $Item;
        }
        ksort($SortedFolders);
        foreach ($SortedFolders as $Folder) {
            $Str = sprintf(
                '<form method="POST" action="Gameloader.php" style="position: absolute; width: 100px; height: 100px; z-index: 1; left: %spx; top: %spx;">
                    <input type="hidden" name="game_folder" value="%s">
                    <input type="image" src="Games/%s/100x100.jpg" alt="Game Icon" style="width: 100px; height: 100px;">
                </form>',
                $Current_X_pos, $Current_colmn, $Folder, $Folder
            );
            echo($Str);
            $Current_X_pos += $px_diff_row;

            if ($Current_X_pos >= $End_from_row_x) 
            {
                if ($Current_colmn == $Column1) {
                    $Current_colmn = $Column2;
                } else {
                    $Current_colmn = $Column3;
                }
                $Current_X_pos = $Begin_from_row_x;
            }
        }
    ?>
</body>
</html>
