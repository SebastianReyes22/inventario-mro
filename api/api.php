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
                $array[$x]['nivel'] = $row['nivel'];
                $array[$x]['cantidad'] = $row['cantidad'];
                $array[$x]['funcion'] = $row['funcion'];
                $array[$x]['aplicacion'] = $row['aplicacion'];
                $array[$x]['imagen'] = $row['imagen'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['inventory' => false]);
        }
    }

    if ($_POST['option'] == 'insert') {
        $query = 'INSERT INTO inventario (item_code, descripcion, descripcion_ingles, ubicacion, nivel, cantidad, funcion, aplicacion, imagen) 
                    VALUES (:item_code, :descripcion, :descripcion_ingles, :ubicacion, :nivel, :cantidad, :funcion, :aplicacion, :imagen);';

        try {
            $statement = $db->prepare($query);
            $statement->bindParam(':item_code', $_POST['item_code']);
            $statement->bindParam(':descripcion', $_POST['descripcion']);
            $statement->bindParam(':descripcion_ingles', $_POST['descripcion_ingles']);
            $statement->bindParam(':ubicacion', $_POST['ubicacion']);
            $statement->bindParam(':nivel', $_POST['nivel']);
            $statement->bindParam(':cantidad', $_POST['cantidad']);
            $statement->bindParam(':funcion', $_POST['funcion']);
            $statement->bindParam(':aplicacion', $_POST['aplicacion']);
            $statement->bindParam(':imagen', $_POST['imagen']);
            $statement->execute();
    
            if ($statement->rowCount() >= 1) {
                echo json_encode(['insert' => true]);
            } else {
                echo json_decode(['insert' => false]);
            }
        }
        catch (PDOException $e) {
            echo json_encode(['insert' => $e->getMessage()]);
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
                $array[$x]['nivel'] = $row['nivel'];
                $array[$x]['imagen'] = $row['imagen'];
                $array[$x]['ubicacion'] = $row['ubicacion'];
                $array[$x]['funcion'] = $row['funcion'];
                $array[$x]['aplicacion'] = $row['aplicacion'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['find' => false]);
        }
    }

    // Agrega producto en el inventario y registra usuario que hizo movimiento
    if ($_POST['option'] == 'addProduct') {
        $updateSql = "UPDATE inventario SET cantidad = cantidad + :cantidad WHERE id_inventario = :id_inventario;";
        $insertSql = "INSERT INTO movimientos (usuario, item, tipo_movimiento, cantidad, comentario, fecha_movimiento) 
                        VALUES (:usuario, :item, :tipo_movimiento, :cantidad, :comentario, :fecha_movimiento);";
    
        $updateStatement = $db->prepare($updateSql);
        $updateStatement->bindParam(':cantidad', $_POST['cantidad']);
        $updateStatement->bindParam(':id_inventario', $_POST['id_inventario']);
        $updateResult = $updateStatement->execute();
    
        $insertStatement = $db->prepare($insertSql);
        $insertStatement->bindParam(':usuario', $_POST['usuario']);
        $insertStatement->bindParam(':item', $_POST['item']);
        $insertStatement->bindParam(':tipo_movimiento', $_POST['tipo_movimiento']);
        $insertStatement->bindParam(':cantidad', $_POST['cantidad']);
        $insertStatement->bindParam(':comentario', $_POST['comentario']);
        $insertStatement->bindParam(':fecha_movimiento', $_POST['fecha_movimiento']);
        $insertResult = $insertStatement->execute();
    
        if ($updateResult && $insertResult) {
            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
    }

    // Elimina producto del inventario y registra usuario que hizo movimiento
    if ($_POST['option'] == 'deleteProduct') {
        $updateSql = "UPDATE inventario SET cantidad = cantidad - :cantidad WHERE id_inventario = :id_inventario;";
        $insertSql = "INSERT INTO movimientos (usuario, item, tipo_movimiento, cantidad, comentario, fecha_movimiento) 
                        VALUES (:usuario, :item, :tipo_movimiento, :cantidad, :comentario, :fecha_movimiento);";

        $updateStatement = $db->prepare($updateSql);
        $updateStatement->bindParam(':cantidad', $_POST['cantidad']);
        $updateStatement->bindParam(':id_inventario', $_POST['id_inventario']);
        $updateResult = $updateStatement->execute();

        $insertStatement = $db->prepare($insertSql);
        $insertStatement->bindParam(':usuario', $_POST['usuario']);
        $insertStatement->bindParam(':item', $_POST['item']);
        $insertStatement->bindParam(':tipo_movimiento', $_POST['tipo_movimiento']);
        $insertStatement->bindParam(':cantidad', $_POST['cantidad']);
        $insertStatement->bindParam(':comentario', $_POST['comentario']);
        $insertStatement->bindParam(':fecha_movimiento', $_POST['fecha_movimiento']);
        $insertResult = $insertStatement->execute();

        if ($updateResult && $insertResult) {
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

    // Todos los niveles
    if ($_POST['option'] == 'getLevels') {
        $array = [];
        $x = 0;
    
        $sql = "SELECT * FROM niveles;";
    
        $statement = $db->prepare($sql);
        
        $statement->execute();
    
        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_nivel'] = $row['id_nivel'];
                $array[$x]['nombre_nivel'] = $row['nombre_nivel'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['levels' => false]);
        }
    }

    // Todo el inventario
    if ($_POST['option'] == 'movimientos') {
        $array = [];
        $x = 0;
        $query = "SELECT * FROM movimientos WHERE fecha_movimiento BETWEEN :fechaInicial AND :fechaFinal
                    AND usuario LIKE CONCAT('%', :usuario '%') ORDER BY fecha_movimiento ASC;";

        $statement = $db->prepare($query);
        $statement->bindParam(':fechaInicial', $_POST['fechaInicial']);
        $statement->bindParam(':fechaFinal', $_POST['fechaFinal']);
        $statement->bindParam(':usuario', $_POST['usuario']);
        $statement->execute();

        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_movimiento'] = $row['id_movimiento'];
                $array[$x]['usuario'] = $row['usuario'];
                $array[$x]['item'] = $row['item'];
                $array[$x]['tipo_movimiento'] = $row['tipo_movimiento'];
                $array[$x]['cantidad'] = $row['cantidad'];
                $array[$x]['comentario'] = $row['comentario'];
                $array[$x]['fecha_movimiento'] = $row['fecha_movimiento'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['movimiento' => false]);
        }
    }

    // Buscar todo del invenario
    if ($_POST['option'] == 'findSingleProduct') {
        $array = [];
        $x = 0;
    
        $sql = "SELECT * FROM inventario WHERE item_code = :item_code;";
    
        $statement = $db->prepare($sql);
    
        $statement->bindParam(':item_code', $_POST['item_code']);
        
        $statement->execute();
    
        if ($statement->rowCount() >= 1) {
            while ($row = $statement->fetch()) {
                $array[$x]['id_inventario'] = $row['id_inventario'];
                $array[$x]['item_code'] = $row['item_code'];
                $array[$x]['descripcion'] = $row['descripcion'];
                $array[$x]['descripcion_ingles'] = $row['descripcion_ingles'];
                $array[$x]['cantidad'] = $row['cantidad'];
                $array[$x]['nivel'] = $row['nivel'];
                $array[$x]['imagen'] = $row['imagen'];
                $array[$x]['ubicacion'] = $row['ubicacion'];
                $array[$x]['funcion'] = $row['funcion'];
                $array[$x]['aplicacion'] = $row['aplicacion'];
                $x++;
            }
            echo json_encode($array);
        } else {
            echo json_encode(['findSingle' => false]);
        }
    }

    // Borrar item
    if ($_POST['option'] == 'deleteProductDB') {
        $query = "DELETE FROM inventario WHERE id_inventario = :id_inventario;";

        try {
            $statement = $db->prepare($query);
            $statement->bindParam(':id_inventario', $_POST['id_inventario']);
            $statement->execute();
    
            if ($statement->rowCount() >= 1) {
                echo json_encode(['deleteProductDB' => true]);
            } else {
                echo json_decode(['deleteProductDB' => false]);
            }
        }
        catch (PDOException $e) {
            echo json_encode(['deleteProductDB' => $e->getMessage()]);
        }
    }

    // Actualizar item
    if ($_POST['option'] == 'updateProductDB') {
        $query = "UPDATE inventario SET item_code = :item_code, descripcion = :descripcion, descripcion_ingles = :descripcion_ingles,
                    ubicacion = :ubicacion, nivel = :nivel, cantidad = :cantidad, funcion = :funcion, aplicacion = :aplicacion, 
                    imagen = :imagen WHERE id_inventario = :id_inventario;";
    
        $statement = $db->prepare($query);
        $statement->bindParam(':item_code', $_POST['item_code']);
        $statement->bindParam(':descripcion', $_POST['descripcion']);
        $statement->bindParam(':descripcion_ingles', $_POST['descripcion_ingles']);
        $statement->bindParam(':ubicacion', $_POST['ubicacion']);
        $statement->bindParam(':nivel', $_POST['nivel']);
        $statement->bindParam(':cantidad', $_POST['cantidad']);
        $statement->bindParam(':funcion', $_POST['funcion']);
        $statement->bindParam(':aplicacion', $_POST['aplicacion']);
        $statement->bindParam(':imagen', $_POST['imagen']);
        $statement->bindParam(':id_inventario', $_POST['id_inventario']);
        $statement->execute();

        if ($statement->rowCount() >= 1) {
            echo json_encode(['updateProductDB' => true]);
        } else {
            echo json_encode(['updateProductDB' => false]);
        }
    }
?>