<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/index.css">
    <title>Cuervos Por Habesha</title>
</head>
<body>
<div class="container pt-3 folios">
    <div class="card">
        <div class="card-header">
            <h5>Sorteo #CuervosPorHabesha</h5>
        </div>
        <div class="card-body" id="login" style="display: none">
            <form class="form-horizontal" onsubmit="return false;">
                <div class="form-group">
                    <input required name="usuario" type="email" class="form-control" placeholder="correo">
                </div>
                <div class="form-group">
                    <input required name="pass" type="password" class="form-control" placeholder="contraseña">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-block btn-success">Ingresar</button>
                </div>
            </form>
        </div>
        <div class="card-body" id="folios" style="display: none">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Donante</th>
                    <th>Correo</th>
                    <th>Donación</th>
                    <th>Boleto</th>
                </tr>
                </thead>
                <tbody>
                <?php
                include "api/mysql.php";
                $mysql = new mysql();
                foreach ($mysql->query("select folios.id,nombre, apellidos,correo,telefono,metodo,cantidad,tipo from folios inner join donaciones d on folios.id_donacion = d.id
inner join donantes d2 on d.id_donante = d2.id order by folios.id") as $folio):
                    ?>
                    <tr>
                        <td><?= $folio['nombre'] . $folio['apellidos'] ?></td>
                        <td><?=$folio['correo']." | ".$folio['telefono']?></td>
                        <td><?="$folio[metodo] $$folio[cantidad] $folio[tipo]"?></td>
                        <td>#CuervoHabesha<?= $folio['id'] ?></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
<script type="application/javascript" src="js/index.js"></script>
<script type="application/javascript" src="js/folios.js"></script>