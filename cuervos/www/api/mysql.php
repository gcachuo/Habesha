<?php

class mysql
{
    private $link;

    public function __construct()
    {
        ini_set("display_errors", 1);
        mysqli_report(MYSQLI_REPORT_ALL ^ (MYSQLI_REPORT_INDEX));//MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $file = __DIR__ . '/mysql.prod.json';
        if (file_exists($file)) {
            $data = json_decode(file_get_contents($file));
            $this->link = mysqli_connect($data->host, $data->user, $data->password, $data->database);

            if (!$this->link) {
                $msg = mysqli_error($this->link);
                throw new DatabaseException($msg);
            }
        } else {
            throw new DatabaseException('No existe el archivo de configuración');
        }
    }

    function query($sql)
    {
        return mysqli_query($this->link, $sql);
    }

    function last_insert_id()
    {
        return mysqli_insert_id($this->link);
    }

    function single_row($mysqli_result, $column = null)
    {
        $row = mysqli_fetch_assoc($mysqli_result);
        if ($column) {
            return $row[$column];
        }
        return $row;
    }

    function all_rows($mysqli_result)
    {
        return mysqli_fetch_all($mysqli_result, MYSQLI_ASSOC);
    }
}

class DatabaseException extends Exception
{

}