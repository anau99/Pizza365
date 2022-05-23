$(document).ready(function(){
    "use strict";
    //R1
    var gPizzaSize = ["S","M","L"];
    var gOrderId = -1;
    var gObject ={};
    var gId = -1;
    var gDataOrder =[];
    const gOrder =["orderId","kichCo","loaiPizza","idLoaiNuocUong","thanhTien","hoTen","soDienThoai","trangThai","action"];
    //Định nghĩa table
    var gTable = $('#table-order').DataTable({
    "columns" :[
        {"data":gOrder[0]},
        {"data":gOrder[1]},
        {"data":gOrder[2]},
        {"data":gOrder[3]},
        {"data":gOrder[4]},
        {"data":gOrder[5]},
        {"data":gOrder[6]},
        {"data":gOrder[7]},
        {"data":gOrder[8]}
    ],
    "columnDefs":[
        {
            "targets":8,
            "defaultContent":`<butoon class=' btn-detail btn btn-primary '> <i class="fas fa-solid fa-file-circle-info text-primary pointer" data-toggle="tooltip" title="Detail">Chi Tiết</i>
            </button>`,
                //`<i onclick="onBtnDetailClick(this)" class="fas fa-solid fa-file-circle-info text-primary pointer" data-toggle="tooltip" title="Detail">Chi Tiết</i>`
        }]
    });

    //R2
    onPageLoading();
    getDrinkLiskAjaxClick();
    getPizzaSizeList(gPizzaSize);
    $("#table-order").on("click",".btn-detail",function(){
        onBtnDetailClick(this);
    });

    $("#btn-filter").on("click",function(){
        onBtnFilterClick();
    });

    $("#btn-confirm").on("click",function(){
        onBtnConfirmClick();
    });

    
    $("#btn-cancel").on("click",function(){
        onBtnCancelClick();
    })
    function onBtnCancelClick(){
        "use strict";
        updateOrder("cancel",gObject);
        console.log("gID " + gId);
        $("#detail-user-modal").modal('hide');
    }

    //R3

    function onPageLoading(){
        "use strict";
        $.ajax({
          url:  "http://42.115.221.44:8080/devcamp-pizza365/orders",
          type: 'GET',
          dataType: 'json', // added data type
          success: function (responseObject) {
            //console.log(JSON.stringify(responseObject));  //response text
            gDataOrder = responseObject;
            console.log(gDataOrder);
            loadDataTotable(gDataOrder);
          },
          error: function (ajaxContext) {
            alert(ajaxContext.responseText);
          }
        });
    }

    //R4
    function loadDataTotable(paramsRsponseObject){
        "use strict";
        //Xóa toàn bộ
        gTable.clear();
        gTable.rows.add(paramsRsponseObject);
        gTable.draw();
    }
    //xử lý ấn nút chi tiết
    function onBtnDetailClick(paramElement){
        "use strict";
        var vRowSelected = $(paramElement).closest('tr');
        var vTable = $("#table-order").DataTable();
        var vDataRow = vTable.row(vRowSelected).data(); 
        gId = vDataRow.id;
        gOrderId = vDataRow.orderId;
        console.log("ID " + gId);
        console.log("Order ID: " + gOrderId);
        $("#detail-user-modal").modal('show');
        getAjaxDetaiOrder(gOrderId);
    
    }

    function onBtnFilterClick(){
        "use strict";
        var vStatus = $("#sel-status").val();
        var vPizzatype = $("#sel-pizza").val();
        var vDatafilter = gDataOrder.filter(function(paramOrder,index){
    
            if(paramOrder.loaiPizza!==null && paramOrder.trangThai!==null){
                return (vStatus==="all" || vStatus.toUpperCase() === paramOrder.trangThai.toUpperCase())
                && (vPizzatype==="all" || vPizzatype.toUpperCase()===paramOrder.loaiPizza.toUpperCase());
            }
        });
        loadDataTotable(vDatafilter);
    }

    function getDrinkLiskAjaxClick(){
        "use strict";
        $.ajax({
            url:  "http://42.115.221.44:8080/devcamp-pizza365/drinks",
            type: 'GET',
            dataType: 'json', // added data type
            success: function (responseObject) {
              handleDrinkList(responseObject);
            },
            error: function (ajaxContext) {
              alert(ajaxContext.responseText);
            }
        });
    }

    function handleDrinkList(paramDrink){
        "use strict";
        $.each(paramDrink,function(i,item){
            $("#select-drink").append($('<option>',{
                text: item.tenNuocUong,
                value: item.maNuocUong
                }))
        })

    }

    function getPizzaSizeList(paramPizza){
        "use strict";
        $.each(paramPizza,function(i,item){
            $("#select-pizzasize").append($('<option>',{
                text: item,
                value: item.toLowerCase()
                }))
        })
    }

    function getAjaxDetaiOrder(paramOrderId){
        "use strict";
        $.ajax({
            url:  "http://42.115.221.44:8080/devcamp-pizza365/orders/" + paramOrderId,
            type: 'GET',
            dataType: 'json', // added data type
            success: function (responseObject) {
              handleOrderDetail(responseObject);
            },
            error: function (ajaxContext) {
              alert(ajaxContext.responseText);
            }
        })
    }

    function handleOrderDetail(paramResponse){
        "use strict";
        $("#input-id").val(paramResponse.id);
        $("#input-orderid").val(paramResponse.orderId);
    
        $("#select-pizzasize").val(paramResponse.kichCo.toLowerCase());
        $("#input-duongkinh").val(paramResponse.duongKinh);
        console.log($("#input-duongkinh").val());

        $("#input-suon").val(paramResponse.suon);
        $("#input-salad").val(paramResponse.salad);
        $("#input-pizzatype").val(paramResponse.loaiPizza);
        $("#input-idvoucher").val(paramResponse.idVourcher);

        $("#input-thanhtien").val(paramResponse.thanhTien);
        $("#input-giamgia").val(paramResponse.giamGia);
        $("#select-drink").val(paramResponse.idLoaiNuocUong);
        $("#input-soluongdrink").val(paramResponse.soLuongNuoc);

        $("#input-fullname").val(paramResponse.hoTen);
        $("#input-email").val(paramResponse.email);
        $("#input-phone").val(paramResponse.soDienThoai);
        $("#input-address").val(paramResponse.diaChi);
        $("#input-message").val(paramResponse.loiNhan);

        $("#input-orderday").val(paramResponse.ngayTao);
        $("#input-repairday").val(paramResponse.ngayCapNhat);

    }

    function onBtnConfirmClick(){
        "use strict";
        var vObjectOrder = {
          id: -1,
          orderId: -1,
          kichCo: "",
          duongKinh: "",
          suon :"",
          salad:"",
          loaiPizza:"",
          idVourcher:"",
          thanhTien: "",
          giamGia: "",
          idLoaiNuocUong:"",
          soLuongNuoc:"",
          hoTen: "",
          email: "",
          soDienThoai: "",
          diaChi:"",
          loiNhan:"",
          ngayTao:"",
          ngayCapNhat:"",
          trangThai	:"..",
          }
        getDataToUpdate(vObjectOrder);
        if(checkData(vObjectOrder)){
            updateOrder("confirmed",vObjectOrder);
            
        }

    }


    function getDataToUpdate(paramsObjectOrder){
        "use strict";
        paramsObjectOrder.id= gId;
        paramsObjectOrder.orderId=  gOrderId;
        paramsObjectOrder.kichCo = $.trim($("#select-pizzasize").val());
        paramsObjectOrder.duongKinh = $.trim($("#input-duongkinh").val()); 
        paramsObjectOrder.suon = $.trim($("#input-suon").val());
        paramsObjectOrder.salad=$.trim($("#input-salad").val());
        paramsObjectOrder.loaiPizza= $.trim($("#input-pizzatype"));
        paramsObjectOrder.idVoucher=$.trim($("#input-idvoucher").val());
        paramsObjectOrder.thanhTien=$.trim($("#input-thanhtien").val());
        paramsObjectOrder.giamGia= $.trim($("#input-giamgia").val());
        paramsObjectOrder.idLoaiNuocUong=$("#select-drink").val();
        paramsObjectOrder.soLuongNuoc=$.trim($("#input-soluongdrink").val());
        paramsObjectOrder.hoTen=$.trim($("#input-fullname").val());
        paramsObjectOrder.email=$.trim($("#input-email").val());
        paramsObjectOrder.soDienThoai= $.trim($("#input-phone").val());
        paramsObjectOrder.diaChi=$.trim($("#input-address").val());
        paramsObjectOrder.loiNhan= $.trim($("#input-message").val());
        paramsObjectOrder.ngayTao= $.trim($("#input-orderday").val());
        paramsObjectOrder.ngayCapNhat=$.trim($("#input-repairday").val());
    }

    function checkData(paramsObjectOrder){
        "use strict";
        // convert object to Arr
        var vArrObject = Object.values(paramsObjectOrder);
        var vIsValid = true;
        for(let bI = 2; bI <= vArrObject.length;bI++){
            if(vArrObject[bI]=="" && bI!=7){
              alert("Vui lòng không được để trống");
              vIsValid = false;
            }
        }
        gObject = paramsObjectOrder;
        return vIsValid;
    }


    function updateOrder(paramStatus,paramObjectOrder){
        paramObjectOrder.trangThai = paramStatus;
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-pizza365/orders" + "/"+ gId,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(paramObjectOrder),
            success: function (responseObject) {
                if(paramStatus=="confirmed"){
                    alert("Đã update thành công");
                    $("#detail-user-modal").modal('hide');

                }
                else {
                  alert ("Đã cancel thành công");
                }
              },
              error: function (ajaxContext) {
                alert(ajaxContext.responseText);
              }
    
          })
        }

    },

);

