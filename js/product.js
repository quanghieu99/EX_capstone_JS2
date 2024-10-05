var listProduct = [];

async function loadProduct() {
    var url = 'https://66f0d3aef2a8bce81be6b89a.mockapi.io/Products';
    const response = await axios.get(url);
    var list = response.data;
    console.log(list);
    listProduct = list;
    var main = ``
    for (var i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-3 col-sm-6 col-6">
                <a href="#" class="linkpro" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setChiTietSanPham(${list[i].id})">
                    <div class="singlepro">
                        <img src="${list[i].img}" class="imgpro">
                        <span class="proname">${list[i].name}</span>
                        <span class="proprice">${formatmoney(list[i].price)}</span>
                    </div>
                </a>
            </div>`
    }
    document.getElementById("listproductindex").innerHTML = main
}

function filterProduct(){
    var loaisanpham = document.getElementById("loaisanpham").value
    var list = [];
    if(loaisanpham == "all"){
        list = listProduct;
    }
    else{
        for (var i = 0; i < listProduct.length; i++) {
            if(listProduct[i].type.toLowerCase() == loaisanpham.toLowerCase()){
                list.push(listProduct[i])
            }
        }
    }
    var main = ``
    for (var i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-3 col-sm-6 col-6">
                <a href="#" class="linkpro" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setChiTietSanPham(${list[i].id})">
                    <div class="singlepro">
                        <img src="${list[i].img}" class="imgpro">
                        <span class="proname">${list[i].name}</span>
                        <span class="proprice">${formatmoney(list[i].price)}</span>
                    </div>
                </a>
            </div>`
    }
    document.getElementById("listproductindex").innerHTML = main
}

var idproduct = null;
function setChiTietSanPham(id){
    for (var i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == id){
            document.getElementById("manhinh").innerHTML = listProduct[i].screen
            document.getElementById("camsau").innerHTML = listProduct[i].backCamera
            document.getElementById("camtruoc").innerHTML = listProduct[i].frontCamera
            document.getElementById("mota").innerHTML = listProduct[i].desc
            idproduct = id;
            return;
        }
    }
}




function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}
