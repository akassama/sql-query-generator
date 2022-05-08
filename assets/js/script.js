$( document ).ready(function() {

    //select query type
    $('#query-type').on('change', function (e) {

        //hide all divs
        displayQueryDiv("");

        //clear all input and output information
        $(".q-input").val("");
        $("#sql-output").html("");
        $("#mysql-output").html("");

        //Get selected
        var selectedOption = $(this).children("option:selected").val();

        //check selected action
        displayQueryDiv(selectedOption);
    });

    //get query information input on key-up
    $(".q-input" ).keyup(function() {
        var query_type = $(this).data("q-type");

        processInput(query_type);
    });

    //function to process the query input
    function processInput(query_type){
        switch(query_type) {
            //if query type is select
            case "select":
              //get input fields
              var field_names = $("#sel-field-names").val();
              var table_name = $("#sel-table-name").val();
              var where_clause = $("#sel-where-clause").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>SELECT</span> "+field_names+" <span class='text-primary'>FROM</span> "+table_name+";"
              if(!isEmpty(where_clause)){
                sql_query = "<span class='text-primary'>SELECT</span> "+field_names+" <span class='text-primary'>FROM</span> "+table_name+" <span class='text-primary'>WHERE</span> "+where_clause+";"
              }
              $("#sql-output").html(sql_query);

              //set mysql input field
              var my_sql_query = "<span class='text-danger'>SELECT</span> "+field_names+" <span class='text-danger'>FROM</span> "+table_name+";"
              if(!isEmpty(where_clause)){
                my_sql_query = "<span class='text-danger'>SELECT</span> "+field_names+" <span class='text-danger'>FROM</span> "+table_name+" <span class='text-danger'>WHERE</span> "+where_clause+";"
              }
              $("#mysql-output").html(my_sql_query);

              break;
            case "insert":
              //get input fields
              var table_name = $("#ins-table-name").val();
              var field_names = $("#ins-field-names").val();
              var values = $("#ins-values").val();

              //check to show/hide brackets
              var fields_ob = "";
              var fields_cb = "";
              var values_ob = "";
              var values_cb = "";

              if(!isEmpty(field_names)){
                fields_ob = "(";
                fields_cb = ")";
              }
              if(!isEmpty(values)){
                values_ob = "(";
                values_cb = ")";
              }

              //set sql input field
              var sql_query = "<span class='text-primary'>INSERT INTO</span> "+table_name+" "+fields_ob+""+field_names+""+fields_cb+" <span class='text-primary'>VALUES</span> "+values_ob+""+values+""+values_cb+";"
              $("#sql-output").html(sql_query);

              //set mysql input field
              var my_sql_query = "<span class='text-danger'>INSERT INTO</span> "+table_name+" "+fields_ob+""+field_names+""+fields_cb+" <span class='text-danger'>VALUES</span> "+values_ob+""+values+""+values_cb+";"
              $("#mysql-output").html(my_sql_query);

              break;
            case "update":
              //get input fields
              var table_name = $("#upd-table-name").val();
              var names_values = $("#upd-names-values").val();
              var where_clause = $("#upd-where-clause").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>UPDATE</span> "+table_name+" <span class='text-primary'>SET</span> "+names_values+";"
              if(!isEmpty(where_clause)){
                sql_query = "<span class='text-primary'>UPDATE</span> "+table_name+" <span class='text-primary'>SET</span> "+names_values+" <span class='text-primary'>WHERE</span> "+where_clause+";"
              }
              $("#sql-output").html(sql_query);

              var my_sql_query = "<span class='text-danger'>UPDATE</span> "+table_name+" <span class='text-danger'>SET</span> "+names_values+";"
              if(!isEmpty(where_clause)){
                my_sql_query = "<span class='text-danger'>UPDATE</span> "+table_name+" <span class='text-danger'>SET</span> "+names_values+" <span class='text-danger'>WHERE</span> "+where_clause+";"
              }
              $("#mysql-output").html(my_sql_query);

              break;
            case "delete":
              //get input fields
              var table_name = $("#del-table-name").val();
              var where_clause = $("#del-where-clause").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>DELETE FROM</span> "+table_name+";"
              if(!isEmpty(where_clause)){
                sql_query = "<span class='text-primary'>DELETE FROM</span> "+table_name+" <span class='text-primary'>WHERE</span> "+where_clause+";"
              }
              $("#sql-output").html(sql_query);
              
              var my_sql_query = "<span class='text-danger'>DELETE FROM</span> "+table_name+";"
              if(!isEmpty(where_clause)){
                my_sql_query = "<span class='text-danger'>DELETE FROM</span> "+table_name+" <span class='text-danger'>WHERE</span> "+where_clause+";"
              }
              $("#mysql-output").html(my_sql_query);

              break;
            case "create_db":
              //get input fields
              var database_name = $("#cdb-database-name").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>CREATE DATABASE</span> "+database_name+";"
              $("#sql-output").html(sql_query);

              var my_sql_query = "<span class='text-danger'>CREATE DATABASE</span> "+database_name+";"
              $("#mysql-output").html(my_sql_query);

              break;
            case "rename_db":
              //get input fields
              var database_name = $("#rdb-database-name").val();
              var new_database_name = $("#rdb-new-database-name").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>ALTER DATABASE</span> "+database_name+" <span class='text-primary'>MODIFY NAME</span> = "+new_database_name+";"
              $("#sql-output").html(sql_query);

              var my_sql_query = "<span class='text-danger'>ALTER DATABASE</span> "+database_name+" <span class='text-danger'>MODIFY NAME</span> = "+new_database_name+";"
              $("#mysql-output").html(my_sql_query);

              break;
            case "drop_db":
            //get input fields
            var database_name = $("#ddb-database-name").val();

            //set sql input field
            var sql_query = "<span class='text-primary'>DROP DATABASE</span> "+database_name+";"
            $("#sql-output").html(sql_query);

            var my_sql_query = "<span class='text-danger'>DROP DATABASE</span> "+database_name+";"
            $("#mysql-output").html(my_sql_query);

            break;
            case "create_tbl":
              //get input fields
              var table_name = $("#ctbl-table-name").val();
              var column_datatypes = $("#ctbl-column-datatypes").val();

              //check to show/hide brackets
              var fields_ob = "";
              var fields_cb = "";

              if(!isEmpty(column_datatypes)){
                fields_ob = "(";
                fields_cb = ")";
              }

              //set sql input field
              var sql_query = "<span class='text-primary'>CREATE TABLE</span> "+table_name+" "+fields_ob+""+column_datatypes+""+fields_cb+";"
              $("#sql-output").html(sql_query);

              var my_sql_query = "<span class='text-danger'>CREATE TABLE</span> "+table_name+" "+fields_ob+""+column_datatypes+""+fields_cb+";"
              $("#mysql-output").html(my_sql_query);

              break;
            case "rename_tbl":

              //get input fields
              var table_name = $("#rtbl-table-name").val();
              var new_table_name = $("#rtbl-new-table-name").val();

              //set sql input field
              var sql_query = "<span class='text-primary'>EXEC SP_RENAME</span> '"+table_name+"', '"+new_table_name+"';"
              $("#sql-output").html(sql_query);

              var my_sql_query = "<span class='text-danger'>ALTER TABLE</span> "+table_name+" <span class='text-danger'>RENAME TO</span> "+new_table_name+";"
              $("#mysql-output").html(my_sql_query);
            
              break;
          case "drop_tbl":
            //get input fields
            var table_name = $("#dtbl-table-name").val();

            //set sql input field
            var sql_query = "<span class='text-primary'>DROP TABLE</span> "+table_name+";"
            $("#sql-output").html(sql_query);

            var my_sql_query = "<span class='text-danger'>DROP TABLE</span> "+table_name+";"
            $("#mysql-output").html(my_sql_query);

            break;
            case "d":
              break;
            case "e":
              break;
            default:
              // code block
          }
    }

    //set 
    function setFieldNames(input_target){

    }

    //function to show query div
    function displayQueryDiv(display_div){
        //hide all divs
        $("#select_div").hide();
        $("#insert_div").hide();
        $("#update_div").hide();
        $("#delete_div").hide();
        $("#create_db_div").hide();
        $("#rename_db_div").hide();
        $("#drop_db_div").hide();
        $("#create_tbl_div").hide();
        $("#rename_tbl_div").hide();
        $("#drop_tbl_div").hide();
        $("#alter_add_div").hide();
        $("#alter_drop_div").hide();
        $("#alter_mod_div").hide();

        //show selected div
        if(display_div !== ""){
            $("#"+display_div).show();
        }
    }

    //check if string is empty
    function isEmpty(string) {
        return (!string || string.length === 0 );
    }

});