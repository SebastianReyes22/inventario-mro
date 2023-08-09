<?php
    header("Access-Control-Allow-Origin: *");
    $dns = 'mysql:host=localhost;dbname=inventario-mro';
    $user = 'root';
    $pdw = 'root';

    try {
        $db = new PDO($dns, $user, $pdw);
    } catch (PDOException $e) {
        echo 'Connection failed';
        die();
    }

    // Todo el inventario
    if ($_POST['option'] == 'inventario') {
        $array = [];
        $x = 0;
        $query = "SELECT * FROM inventario;";

        $statement = $db->prepare($query);
        $statement->execute();

        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_inventario'] = $row['id_inventario'];
                $array[$x]['item_code'] = $row['item_code'];
                $array[$x]['descripcion'] = $row['descripcion'];
                $array[$x]['descripcion_ingles'] = $row['descripcion_ingles'];
                $array[$x]['ubicacion'] = $row['ubicacion'];
                $array[$x]['cantidad'] = $row['cantidad'];
                $array[$x]['imagen'] = $row['imagen'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['inventory' => false]);
        }
    }

    if ($_POST['option'] == 'insert') {
        $query = 'INSERT INTO inventario (item_code, descripcion, descripcion_ingles, ubicacion, cantidad, imagen) 
                    VALUES (:item_code, :descripcion, :descripcion_ingles, :ubicacion, :cantidad, :imagen);';

        $statement = $db->prepare($query);
        $statement->bindParam(':item_code', $_POST['item_code']);
        $statement->bindParam(':descripcion', $_POST['descripcion']);
        $statement->bindParam(':descripcion_ingles', $_POST['descripcion_ingles']);
        $statement->bindParam(':ubicacion', $_POST['ubicacion']);
        $statement->bindParam(':cantidad', $_POST['cantidad']);
        $statement->bindParam(':imagen', $_POST['imagen']);
        $statement->execute();

        if ($statement->rowCount() >= 1) {
            echo json_encode(['insert' => true]);
        } else {
            echo json_decode(['insert' => false]);
        }
    }

    // Buscar todo del invenario
    if ($_POST['option'] == 'findProduct') {
        $array = [];
        $x = 0;
    
        $sql = "SELECT * FROM inventario WHERE item_code LIKE CONCAT('%', :item_code '%') 
                OR descripcion LIKE CONCAT('%', :descripcion '%')
                OR descripcion_ingles LIKE CONCAT('%', :descripcion_ingles '%');";
    
        $statement = $db->prepare($sql);
    
        $statement->bindParam(':item_code', $_POST['item_code']);
        $statement->bindParam(':descripcion', $_POST['descripcion']);
        $statement->bindParam(':descripcion_ingles', $_POST['descripcion_ingles']);
        
        $statement->execute();
    
        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_inventario'] = $row['id_inventario'];
                $array[$x]['item_code'] = $row['item_code'];
                $array[$x]['descripcion'] = $row['descripcion'];
                $array[$x]['descripcion_ingles'] = $row['descripcion_ingles'];
                $array[$x]['cantidad'] = $row['cantidad'];
                $array[$x]['imagen'] = $row['imagen'];
                $array[$x]['ubicacion'] = $row['ubicacion'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['find' => false]);
        }
    }

    // Agrega producto +1 en el inventario
    if ($_POST['option'] == 'addProduct') {
        $sql = "UPDATE inventario SET cantidad = cantidad + :cantidad WHERE id_inventario = :id_inventario;";

        $statement = $db->prepare($sql);

        $statement->bindParam(':id_inventario', $_POST['id_inventario']);
        $statement->bindParam(':cantidad', $_POST['cantidad']);

        $statement->execute();

        if ($statement->rowCount() > 0) {
            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
    }

    // Elimina producto -1 en el inventario
    if ($_POST['option'] == 'deleteProduct') {
        $sql = "UPDATE inventario SET cantidad = cantidad - :cantidad WHERE id_inventario = :id_inventario;";

        $statement = $db->prepare($sql);

        $statement->bindParam(':id_inventario', $_POST['id_inventario']);
        $statement->bindParam(':cantidad', $_POST['cantidad']);

        $statement->execute();

        if ($statement->rowCount() > 0) {
            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
    }

    if ($_POST['option'] == 'getLocations') {
        $array = [];
        $x = 0;
    
        $sql = "SELECT * FROM ubicaciones;";
    
        $statement = $db->prepare($sql);
        
        $statement->execute();
    
        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_ubicacion'] = $row['id_ubicacion'];
                $array[$x]['nombre_ubicacion'] = $row['nombre_ubicacion'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['locations' => false]);
        }
    }
?>