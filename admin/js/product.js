var listProduct = [];
var listProductMem = [];

async function loadProduct() {
    var url = 'https://66ef916c3ed5bb4d0bf3b91b.mockapi.io/Products/';
    const response = await axios.get(url);
    var list = response.data;
    console.log(list);
    listProduct = list;
    listProductMem = list;
    var main = ``
    for (var i = 0; i < list.length; i++) {
        main += ` <tr>
                    <td>${list[i].id}</td>
                    <td><img class="imgproduct" src="${list[i].img}"></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].type}</td>
                    <td>
                        <a href="addproduct.html?id=${list[i].id}" class="edit-btn">Edit</a>
                        <a onclick="deleteProduct(${list[i].id})" class="delete-btn">Delete</a>
                    </td>
                </tr>`
    }
    document.getElementById("listproduct").innerHTML = main
}


function searchProduct(){
    listProductMem = [];
    var search = document.getElementById("search").value
    var main = ``
    for (var i = 0; i < listProduct.length; i++) {
        if(listProduct[i].name.toLowerCase().includes(search.toLowerCase())){
            main += ` <tr>
                    <td>${listProduct[i].id}</td>
                    <td><img class="imgproduct" src="${listProduct[i].img}"></td>
                    <td>${listProduct[i].name}</td>
                    <td>${listProduct[i].price}</td>
                    <td>${listProduct[i].type}</td>
                    <td>
                        <a href="addproduct.html?id=${listProduct[i].id}" class="edit-btn">Edit</a>
                        <a onclick="deleteProduct(${listProduct[i].id})" class="delete-btn">Delete</a>
                    </td>
                </tr>`
            listProductMem.push(listProduct[i])
        }
    }
    document.getElementById("listproduct").innerHTML = main
}

function sapXep(){
    var sort = document.getElementById("sort").value
    if(sort == "asc"){
        listProductMem.sort(function(a, b) {
            return a.price - b.price; // so sánh giá giữa a và b
        });
    }
    if(sort == "desc"){
        listProductMem.sort(function(a, b) {
            return b.price - a.price; // so sánh giá giữa a và b
        });
    }
    var main = ``
    for (var i = 0; i < listProductMem.length; i++) {
        main += ` <tr>
                <td>${listProductMem[i].id}</td>
                <td><img class="imgproduct" src="${listProductMem[i].img}"></td>
                <td>${listProductMem[i].name}</td>
                <td>${listProductMem[i].price}</td>
                <td>${listProductMem[i].type}</td>
                <td>
                    <a href="addproduct.html?id=${listProductMem[i].id}" class="edit-btn">Edit</a>
                    <a onclick="deleteProduct(${listProductMem[i].id})" class="delete-btn">Delete</a>
                </td>
            </tr>`
    }
    document.getElementById("listproduct").innerHTML = main
}


var linkbanner = '';
async function saveProduct() {
    document.getElementById("loading").style.display = 'block'
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'https://66ef916c3ed5bb4d0bf3b91b.mockapi.io/Products/';
    var linkImg = await uploadImage();
    if(linkImg != null){
        linkbanner = linkImg
    }
    var product = {
        "name": document.getElementById("name").value,
        "price": document.getElementById("price").value,
        "screen": document.getElementById("screen").value,
        "backCamera": document.getElementById("backcam").value,
        "frontCamera": document.getElementById("frontcam").value,
        "img": linkbanner,
        "desc": document.getElementById("mota").value,
        "type": document.getElementById("type").value,
    }
    if(id != null){
        product.id = id
    }
    console.log(product)
    var method = 'POST';
    if(id != null){
        method = 'PUT'
        url = url +'/'+id
    }
    var response = null;
    if(id == null){
        response = await axios.post(url,product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    else{
        response = await axios.put(url,product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "thêm/sửa sản phẩm thành công",
                type: "success"
            },
            function() {
                document.getElementById("loading").style.display = 'none'
                window.location.href = 'product.html';
            });
    } else {
        swal({
                title: "Thông báo",
                text: "thêm/sửa sản phẩm thất bại",
                type: "error"
            },
            function() {
                document.getElementById("loading").style.display = 'none'
            });
    }
}

async function loadAProduct() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if (id != null) {
        document.getElementById("tieudeweb").innerHTML = "Cập nhật sản phẩm";
        document.getElementById("btnthemsp").innerHTML = "Cập nhật sản phẩm";
        var url = 'https://66ef916c3ed5bb4d0bf3b91b.mockapi.io/Products/' + id;
        const response = await axios.get(url);
        var result = await response.data;
        console.log(result)
        document.getElementById("name").value = result.name
        document.getElementById("price").value = result.price
        document.getElementById("type").value = result.type
        document.getElementById("screen").value = result.screen
        document.getElementById("frontcam").value = result.frontCamera
        document.getElementById("backcam").value = result.backCamera
        document.getElementById("mota").value = result.desc
        linkbanner = result.img
    }
}


async function deleteProduct(id) {
    var con = confirm("Bạn chắc chắn muốn xóa sản phẩm này?");
    if (con == false) {
        return;
    }
    var url = 'https://66ef916c3ed5bb4d0bf3b91b.mockapi.io/Products/' + id;
    const response = await axios.delete(url);
    if (response.status < 300) {
        toastr.success("xóa sản phẩm thành công!");
        loadProduct();
    }
    else {
        toastr.warning("Xóa thất bại");
    }
}