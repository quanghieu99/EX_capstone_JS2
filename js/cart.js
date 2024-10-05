var listcart = localStorage.getItem("product_cart");
function addCart(){
    if(idproduct == null){
        toastr.error("Bạn chưa chọn sản phẩm nào");
        return;
    }

    var product = {};
    for (var i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == idproduct){
            product.id = listProduct[i].id
            product.name = listProduct[i].name
            product.price = listProduct[i].price
            product.img = listProduct[i].img
            break;
        }
    }
    product.quantity = 1;
    if (listcart === null) {
    	var cart = [];
    	cart.push(product);
    	window.localStorage.setItem('product_cart', JSON.stringify(cart));
	}
    else{
        var list = JSON.parse(localStorage.getItem("product_cart"));
        var check = 0;
		for(i=0; i<list.length; i++){
			if(list[i].id == idproduct){
				list[i].quantity = Number(1)+Number(list[i].quantity);
				check = 1;
			}
		}
		if(check == 0){
			list.push(product);
		}
		window.localStorage.setItem('product_cart', JSON.stringify(list));
    }
    loadCartMenu();
    toastr.success("Thêm giỏ hàng thành công");
}

function loadCartMenu(){
    var listcart = localStorage.getItem("product_cart");
    if(listcart != null){
        var list = JSON.parse(localStorage.getItem("product_cart"));
        document.getElementById("slcartmenu").innerHTML = list.length
    }
}


function loadCart(){
    var listcart = localStorage.getItem("product_cart");
    if(listcart == null){
        return;
    }
	var list = JSON.parse(listcart);
	var main = '';
    var tongtien = 0;
    var tongsl = 0;
	for(i=0; i<list.length; i++){
		tongtien += list[i].price*list[i].quantity;
        tongsl += Number(list[i].quantity);
		main += 
        `<tr>
            <td>
                <a href="detail?id=${list[i].id}"><img class="imgprocart" src="${list[i].img}"></a>
                <div class="divnamecart">
                    <a href="detail?id=${list[i].id}" class="nameprocart">${list[i].name}</a>
                </div>
            </td>
            <td><p class="boldcart">${formatmoney(list[i].price)}</p></td>
            <td>
                <div class="clusinp"><button onclick="updateQuantity(${list[i].id}, -1)" class="cartbtn"> - </button>
                <input value="${list[i].quantity}" class="inputslcart">
                <button onclick="updateQuantity(${list[i].id}, 1)" class="cartbtn"> + </button></div>
            </td>
            <td>
                <div class="tdpricecart">
                    <p class="boldcart">${formatmoney(list[i].quantity * list[i].price)}</p>
                    <p onclick="removeCart(${list[i].id})" class="delcart"><i class="fa fa-trash-o facartde"></i></p>
                </div>
            </td>
        </tr>`
	}

	document.getElementById("listcartDes").innerHTML = main;
	document.getElementById("slcart").innerHTML = tongsl;
    document.getElementById("tonggiatien").innerText = formatmoney(tongtien)
}


async function updateQuantity(id, sl){
    var listcart = localStorage.getItem("product_cart");
    var list = JSON.parse(listcart);
    var data = {}
    for (var i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == id){
            data = listProduct[i]
            break;
        }
    }
    var numbers = 0;
    for(i=0; i<list.length; i++){
        if(list[i].id == id){
            numbers = list[i].quantity + sl
        }
    }
    if(numbers < 1){
        removeCart(id);
        return;
    }
    for(i=0; i<list.length; i++){
        if(list[i].id == id){
            list[i].quantity = Number(list[i].quantity) + sl
        }
    }
    window.localStorage.setItem('product_cart', JSON.stringify(list));
    loadCart();
    loadCartMenu();
}


function removeCart(id){
	var list = JSON.parse(localStorage.getItem("product_cart"));
	var remainingArr = list.filter(data => data.id != id);
	window.localStorage.setItem('product_cart', JSON.stringify(remainingArr));
    toastr.success("Đã xóa sản phẩm khỏi giỏ hàng!")
    loadCart();
}