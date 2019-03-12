<?php

class mysql
{
    private $link;

    public function __construct()
    {
        $data = json_decode(file_get_contents('mysql.prod.json'));
        $this->link = mysqli_connect($data->host, $data->user, $data->password, $data->database);

        if (!$this->link) {
            $msg = mysqli_error($this->link);
            throw new Exception($msg);
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
}