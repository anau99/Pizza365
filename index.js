//Region 1
 // bạn có thê dùng để lưu trữ combo được chọn, mỗi khi khách chọn bạn lại đổi giá trị properties của nó
 var gSelectedMenuStructure = {
    menuName: "...",    // S, M, L
    duongKinhCM: 0,
    suongNuong: 0,
    saladGr: 0,
    drink: 0,
    priceVND: 0
  }
var  gSelectedPizzaType ="";
var gId = "";
var gOrderId = "";


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
        $("#input-select").append($('<option>',{
            text: item.tenNuocUong,
            value: item.maNuocUong
            }))
    })

}

function onPageLoading(){
    getDrinkLiskAjaxClick();
   
}

function onBtnSizeSClick(){
    "use strict";
    
      // map lựa chọn vào gSelectedMenuStructure
      gSelectedMenuStructure.menuName = "S"; 
      gSelectedMenuStructure.duongKinhCM = "20";
      gSelectedMenuStructure.suongNuong = 1 ;
      gSelectedMenuStructure.saladGr = 200;
      gSelectedMenuStructure.drink = 2;
      gSelectedMenuStructure.priceVND = 150000;

      console.log(gSelectedMenuStructure.menuName);
      console.log(gSelectedMenuStructure.duongKinhCM);
      console.log(gSelectedMenuStructure.suongNuong);
      console.log(gSelectedMenuStructure.saladGr);
      console.log(gSelectedMenuStructure.drink);
      console.log(gSelectedMenuStructure.priceVND);
      setMenuButtonsColor(gSelectedMenuStructure.menuName);
}

function onBtnSizeMClick(){
    "use strict";
       // map lựa chọn vào gSelectedMenuStructure
       gSelectedMenuStructure.menuName = "M"; 
       gSelectedMenuStructure.duongKinhCM = "25";
       gSelectedMenuStructure.suongNuong = 4 ;
       gSelectedMenuStructure.saladGr = 300;
       gSelectedMenuStructure.drink = 3;
       gSelectedMenuStructure.priceVND = 200000;
       
       console.log(gSelectedMenuStructure.menuName);
       console.log(gSelectedMenuStructure.duongKinhCM);
       console.log(gSelectedMenuStructure.suongNuong);
       console.log(gSelectedMenuStructure.saladGr);
       console.log(gSelectedMenuStructure.drink);
       console.log(gSelectedMenuStructure.priceVND);
       setMenuButtonsColor(gSelectedMenuStructure.menuName);
}

function onBtnSizeLClick(){
    "use strict";
    // map lựa chọn vào gSelectedMenuStructure
    gSelectedMenuStructure.menuName = "L"; 
    gSelectedMenuStructure.duongKinhCM = "25";
    gSelectedMenuStructure.suongNuong = 4 ;
    gSelectedMenuStructure.saladGr = 300;
    gSelectedMenuStructure.drink = 3;
    gSelectedMenuStructure.priceVND = 200000;
    
    console.log(gSelectedMenuStructure.menuName);
    console.log(gSelectedMenuStructure.duongKinhCM);
    console.log(gSelectedMenuStructure.suongNuong);
    console.log(gSelectedMenuStructure.saladGr);
    console.log(gSelectedMenuStructure.drink);
    console.log(gSelectedMenuStructure.priceVND);
    setMenuButtonsColor(gSelectedMenuStructure.menuName);
}


function onBtnHawaiClick(){
    "use strict"; 
    gSelectedPizzaType  = "hawai"; 
    console.log(gSelectedPizzaType); 
    //set trạng thái của nut - set the buttons style
    setTypeButtonsColor(gSelectedPizzaType);
}

function onBtnThitHunKhoiClick(){ 
    "use strict";
    gSelectedPizzaType  = "thithunkhoi"; 
    console.log(gSelectedPizzaType); 
    //set trạng thái của nut - set the buttons style
    setTypeButtonsColor(gSelectedPizzaType);
}

function onBtnHaiSanClick(){
    "use strict";
    gSelectedPizzaType  = "haisan"; 
    console.log(gSelectedPizzaType); 
    setTypeButtonsColor(gSelectedPizzaType);

}

function setTypeButtonsColor(paramSelectedTypeName) {
  "use strict";
  //truy vấn 03 nút
  console.log("selected type .. = " + paramSelectedTypeName); //tracking
  var vSelectTypeHawaiButton = $("#type-hawai");
  var vSelectTypeHaiSanButton = $("#type-hai-san");
  var vSelectTypeThitHunKhoiButton =$("#type-thit-hun-khoi");
  // set classname cho 03 nút này, tùy và lựa chon là gì
  switch (paramSelectedTypeName) {
    case "hawai":
      vSelectTypeHawaiButton.removeClass('btn btn-success').addClass('btn bg-orange'); //oragge
      vSelectTypeHaiSanButton.removeClass('btn bg-orange').addClass('btn btn-success');
      vSelectTypeThitHunKhoiButton.removeClass('btn bg-orange').addClass('btn btn-success');
      break;
    case "haisan":
      vSelectTypeHawaiButton.removeClass('btn bg-orange').addClass('btn btn-success');      ;
      vSelectTypeHaiSanButton.removeClass('btn btn-success').addClass('btn bg-orange'); //orange
      vSelectTypeThitHunKhoiButton.removeClass('btn bg-orange').addClass('btn btn-success');
      break;
    case "thithunkhoi":
      vSelectTypeHawaiButton.removeClass('btn bg-orange').addClass('btn btn-success');
      vSelectTypeHaiSanButton.removeClass('btn bg-orange').addClass('btn btn-success');
      vSelectTypeThitHunKhoiButton.removeClass('btn btn-success').addClass('btn bg-orange'); //orange
  }
}

function setMenuButtonsColor(paramSelectedMenuName){
    "use strict";
    //truy vấn 03 nút
    console.log("selected menu .. = " + paramSelectedMenuName); //tracking
    var vSelectSizeMButton = $("#sizeM");
    var vSelectSizeLButton = $("#sizeL");
    var vSelectSizeSButton = $("#sizeS");
    //var vSelectSizeSButton = document.getElementById("sizeS");
    // set classname cho 03 nút này, tùy và lựa chon là gì
    switch (paramSelectedMenuName) {
      case "M":
        vSelectSizeMButton.removeClass('btn btn-success').addClass('btn bg-orange');
        vSelectSizeLButton.removeClass('btn bg-orange').addClass('btn btn-success');
        vSelectSizeSButton.removeClass('btn bg-orange').addClass('btn btn-success');
        break;
      case "L":
        vSelectSizeLButton.removeClass('btn btn-success').addClass('btn bg-orange');
        vSelectSizeMButton.removeClass('btn bg-orange').addClass('btn btn-success');
        vSelectSizeSButton.removeClass('btn bg-orange').addClass('btn btn-success');
        break;
      case "S":
       vSelectSizeSButton.removeClass('btn btn-success').addClass('btn bg-orange');
       vSelectSizeMButton.removeClass('btn bg-orange').addClass('btn btn-success');
       vSelectSizeLButton.removeClass('btn bg-orange').addClass('btn btn-success');
    }
}
function onBtnKiemTraDonClick(){
    "use strict";
  //  $('#order-modal').modal("show");
    var vKhachHang = {
        fullName: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
        maGiamGia: "",
      };
    getKhachHangData(vKhachHang);
    var vIsValidate = validateData(vKhachHang);
    if(vIsValidate){
      
        writeDataKhachHang(vKhachHang);
        $("#order-modal").modal('show');
    }
}

function getKhachHangData(paramKhacHang){
    "use strict";
    var vInputFullName = $.trim($("#inp-fullname").val());
    var vInputEmail = $.trim($("#inp-email").val());
    var vInputPhoneNumber =$.trim($("#inp-dien-thoai").val());
    var vInputAddress = $.trim($("#inp-dia-chi").val());
    var vInputMessage = $.trim($("#inp-message").val());
    var vInputVoucherCode = $.trim($("#inp-voucher").val());
  
    // Đọc giá trị và ghi vào đối tượng
    paramKhacHang.fullName = vInputFullName;
    paramKhacHang.email = vInputEmail;
    paramKhacHang.soDienThoai = vInputPhoneNumber;
    paramKhacHang.diaChi = vInputAddress;
    paramKhacHang.loiNhan = vInputMessage;
    paramKhacHang.maGiamGia = vInputVoucherCode;
}

function validateData(paramKhachHang){
    "use strict";
    if (paramKhachHang.fullName === "") {
        alert("Bạn cần nhập đẩy đủ Họ và Tên");
        return false;
      }
      if (paramKhachHang.email === "") {
        alert("Email không được bỏ trống");
        return false;
      } 
      if (!paramKhachHang.email.includes("@")) {
        alert("Email phải có định dạng @");
        return false;
      } 
      if (paramKhachHang.soDienThoai ==="") {
        alert("Số điện thoại không được bỏ trống");
        return false;
      } 

      if (isNaN(paramKhachHang.soDienThoai)) {
        alert("Số điện thoại phải là dạng số");
        return false;
      } 
      if (paramKhachHang.diaChi === "") {
        alert("Địa chỉ không được bỏ trống");
        return false;
      }

      return true;

}

function writeDataKhachHang(paramKhachang){
    "use strict";
    var vPhanTramGiamGia = getVoucher(paramKhachang);
    // vPhanTramGiamGia.phanTramGiamGia;
    var vPrice = gSelectedMenuStructure.priceVND - (gSelectedMenuStructure.priceVND * parseInt(vPhanTramGiamGia.phanTramGiamGia)) / 100;
    if(vPrice.toString()==="NaN") vPrice = gSelectedMenuStructure.priceVND;
    if(vPrice===gSelectedMenuStructure.priceVND) vPhanTramGiamGia.phanTramGiamGia= 0;
    $("#inp-fullname2").val(paramKhachang.fullName);
    $("#inp-dien-thoai2").val(paramKhachang.soDienThoai);
    $("#inp-dia-chi2").val(paramKhachang.diaChi);
    $("#inp-messag2").val(paramKhachang.loiNhan);
    $("#inp-voucher-id2").val(paramKhachang.maGiamGia);
    $('#inp-email2').val(paramKhachang.email);
    console.log($("#inp-fullname2").val(paramKhachang.fullName));
    
    $('#txt-area').val(
        "Họ tên: " + paramKhachang.fullName +" "
        +"Email: " +paramKhachang.email +" "
        +"Điện Thoại: " + paramKhachang.soDienThoai +" "
        +"Địa chỉ: " +paramKhachang.diaChi+" "
        +"Lời Nhắn: " + paramKhachang.loiNhan+" "
        +"Mã Giảm giá " +  paramKhachang.maGiamGia +" "
        +"Menu : " + gSelectedMenuStructure.menuName+" "
        +"Đường kính: " + gSelectedMenuStructure.duongKinhCM+" "
        +"Sườn nướng: " + gSelectedMenuStructure.suongNuong+" "
        +"Salad :" + gSelectedMenuStructure.saladGr+" "
        +"Sườn nướng: " + gSelectedMenuStructure.suongNuong +" "
        +"Drink: " + gSelectedMenuStructure.drink+" "
        +"Price: " +  vPrice
        +"Discount: " + vPhanTramGiamGia.phanTramGiamGia +"%"+" "
        +"Loại Pizza: " +  gSelectedPizzaType +" "
        +"Loại Đồ Uống: " + $("#input-select option:selected" ).text()
    )
 
    

}

function getVoucher(paramKhachang){
    "use strict";
    var vStringMagiamGia ={};
    $.ajax({
        url:  "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail" + "/" + paramKhachang.maGiamGia,
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (responseObject) {
            vStringMagiamGia =responseObject;
          
        },
        error: function (ajaxContext) {
          alert(ajaxContext.responseText);
        }
    })
    return vStringMagiamGia;
}

function onBtnTaoDonClick(){
    "use strict";
     //Lấy dữ liệu để tạo đơn hàng mới
     var vObjectRequest = {
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: -1,
        hoTen: "",
        thanhTien: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: ""
    }
    getDataObjectRequest(vObjectRequest);
    callApiServiceOrder(vObjectRequest);
   
}

function getDataObjectRequest(paramObjectRequest){
    paramObjectRequest.kichCo = gSelectedMenuStructure.menuName;
    paramObjectRequest.duongKinh = gSelectedMenuStructure.duongKinhCM;
    paramObjectRequest.soLuongNuoc= gSelectedMenuStructure.drink;
    paramObjectRequest.thanhTien = gSelectedMenuStructure.priceVND;
    paramObjectRequest.salad = gSelectedMenuStructure.saladGr;
    paramObjectRequest.suongNuong = gSelectedMenuStructure.suongNuong;

    var vGetElemenSelect = $("#input-select option:selected").text();
    paramObjectRequest.idLoaiNuocUong = vGetElemenSelect;
    paramObjectRequest.loaiPizza = gSelectedPizzaType;

    paramObjectRequest.hoTen = $("#inp-fullname2").val();
    paramObjectRequest.email = $('#inp-email2').val();
    paramObjectRequest.idVourcher = $("#inp-voucher-id2").val();
    paramObjectRequest.diaChi = $("#inp-dia-chi2").val();
    paramObjectRequest.loiNhan = $("#inp-messag2").val();
    paramObjectRequest.soDienThoai = $("#inp-dien-thoai2").val();

}
function callApiServiceOrder(paramObjectRequest){
    "use strict";
    $.ajax({
        url:  "http://42.115.221.44:8080/devcamp-pizza365/orders",
        type: 'POST',
        data: JSON.stringify(paramObjectRequest),
        dataType: 'json', // added data type
        contentType: "application/json",
        success: function (responseObject) {
            console.log(responseObject);
            gId = responseObject.id;
            gOrderId = responseObject.orderId;
            alert("Thành công");
            showOrderIDToCustomer(responseObject);
            $("#order-modal").modal('hide');
            $("#order-result").modal('show');
            
          
        },
        error: function (ajaxContext) {
          alert(ajaxContext.responseText);
        }
    })
}

function showOrderIDToCustomer(paramObjectRequest){
    "use strict";
    var vGetElementShowOrderID = $("#inp-madonhang");
    vGetElementShowOrderID.val(paramObjectRequest.orderId);

}

