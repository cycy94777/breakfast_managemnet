// import data from './data/CurrentOrders.json' assert { type: 'json' };
// console.log(data);

// Add Event Listener
const mainContent = document.getElementById("main-content");
// default content and home page
// function loadPendingOrders() {
//     // const mainContent = document.getElementById('main-content');
//     // 這裡可以使用 AJAX 或 Fetch 來載入實際的訂單數據
//     // 現在只顯示靜態的示範內容
    
//     mainContent.innerHTML = `
//         <h2>待處理訂單</h2>
//         </br>
//         <div id="
//         <p>這裡顯示待處理的訂單資訊。可以根據實際需要填充內容。</p>
//         <ul>
//             <li>訂單 #12345 - 2024/09/01</li>
//             <li>訂單 #12346 - 2024/09/02</li>
//             <!-- 更多訂單資訊 -->
//         </ul>
//     `;
// };
function loadPendingOrders() {
    fetch("./data/CurrentOrders.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.style.overflowY = 'auto'; // 顯示滾動條
        mainContent.innerHTML = '<h3>待處理訂單</h3></br>'; // Clear any existing content

        data.CurrentOrders.forEach(order => {
            // Create a container for each order
            const orderContainer = document.createElement('div');
            orderContainer.classList.add('mb-4'); // Add some margin-bottom for spacing

            // Create a row for the basic order details
            const orderDetails = document.createElement('div');
            orderDetails.classList.add('row', 'mb-2', 'align-items-center');

            const pickupId = document.createElement('div');
            pickupId.classList.add('col');
            pickupId.innerHTML = `取餐編號：<span style="background-color: #DCD9D8;">${order.pickupId}</span>`;

            const memberId = document.createElement('div');
            memberId.classList.add('col');
            memberId.innerHTML = `會員名稱：
            <span style="background-color: #DCD9D8;">${order.memberId}</span>`;

            const totalAmount = document.createElement('div');
            totalAmount.classList.add('col');
            totalAmount.innerHTML = `總金額：
            <span style="background-color: #DCD9D8; color: red;"> ${order.總金額} </span>`;

            orderDetails.appendChild(pickupId);
            orderDetails.appendChild(memberId);
            orderDetails.appendChild(totalAmount);

            // Create a table for the order items
            const table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-bordered');

            // Create the table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            // headerRow.style.backgroundColor = '#003366'; // Dark blue background for header

            const headers = ['商品名稱', '加選資訊', '商品數量'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.scope = 'col';
                // th.style.color = 'white !important'; // White text color
                // th.style.border = '1px solid white !important'; // White border around headers
                th.innerText = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow); // Append header row to thead
            table.appendChild(thead); // Append thead to the table

            // Create the table body
            const tbody = document.createElement('tbody');

            order.商品.forEach(item => {
                const row = document.createElement('tr');

                const itemName = document.createElement('td');
                itemName.innerText = item.商品名稱;

                const addInfo = document.createElement('td');
                addInfo.innerText = item.加選資訊;

                const quantity = document.createElement('td');
                quantity.innerText = item.商品數量;

                // Add border to table cells
                [itemName, addInfo, quantity].forEach(td => {
                    td.style.border = '1px solid #ccc'; // Light gray border for cells
                });

                row.appendChild(itemName);
                row.appendChild(addInfo);
                row.appendChild(quantity);

                tbody.appendChild(row);
            });

            table.appendChild(tbody); // Append tbody to the table

            // Append order details and table to the container
            orderContainer.appendChild(orderDetails);
            orderContainer.appendChild(table);

            // Append the entire container to the main content area
            mainContent.appendChild(orderContainer);
        });
    })
    .catch(error => {
        console.error('Error fetching the orders:', error);
    });
}


// 商店管理 - 公休管理
function loadRestDays() {
    fetch("./data/Closedate.json")
        .then(response => response.json())
        .then(data => {
            const mainContent = document.querySelector('.main-content');
            mainContent.innerHTML = `
            <h3 style="margin-bottom: 15px;">公休管理</h3>
            <div class="container" style="background-color: white; padding: 20px; border-radius: 8px;">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fa-solid fa-calendar-days"></i>
                            </span>
                            <input type="text" class="form-control" placeholder="請輸入日期" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-light" type="button">新增</button>
                    </div>
                </div>

                <!-- 將表格放在白色區塊內 -->
                <div class="row mt-3">
                    <div class="col-12">
                        <table class="table table-striped table-bordered" style="margin-top: 10px;">
                            <thead>
                                <tr>
                                    <th scope="col">日期</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.CloseDate.map(date => `
                                    <tr>
                                        <td>${date}</td>
                                        <td>
                                            <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                                                <i class="fa-solid fa-trash"></i>
                                                刪除
                                            </a>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error('Error fetching the orders:', error);
        });
}



// 商店管理 - 帳戶管理
function loadManagementAccounts(){
    fetch("./data/Accounts.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `<h3>帳戶資訊</h3></br>`;
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        // headerRow.style.backgroundColor = '#003366'; // Dark blue background for header

        const headers = ['名稱', '帳號','註冊日'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.innerText = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow); // Append header row to thead
        table.appendChild(thead); // Append thead to the table

        // Create the table body
        const tbody = document.createElement('tbody');
        data.ManagementAccounts.forEach(account => {
            const row = document.createElement('tr');
            const name = document.createElement('td');
            name.innerText = account.名稱;

            const gmail = document.createElement('td');
            gmail.innerText = account.帳號;

            const rDate = document.createElement('td');
            rDate.innerText = account.註冊日;

            [name, gmail, rDate].forEach(td => {
                td.style.border = '1px solid #ccc'; // Light gray border for cells
            });

            row.appendChild(name);
            row.appendChild(gmail);
            row.appendChild(rDate);
            tbody.appendChild(row);      
        
        });
        table.appendChild(tbody); // Append tbody to the table
        mainContent.appendChild(table);
        
    })
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
};

// 商品管理 - 商品類別
function loadProductCategories() {
    fetch("./data/ProductCategories.json")
        .then(response => response.json())
        .then(data => {
            const mainContent = document.querySelector('.main-content');
            mainContent.innerHTML = `
            <h3>商品類別管理</h3>
            <div class="container" style="background-color: white; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px;">
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- 左側的按鈕 -->
                            <button style="background-color: #ccc">新增商品類別</button>

                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2" style="margin-bottom:7px">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">商品類別名稱</th>
                                <th scope="col">操作</th>
                            </tr>
                        </thead>
                        <tbody id="categoryTableBody">
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" class="mt-4">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

            const tbody = document.getElementById('categoryTableBody');
            data.ProductCategories.forEach(name => {
                const row = document.createElement('tr');
                const categoryName = document.createElement('td');
                categoryName.innerText = name;

                const operate = document.createElement('td');
                operate.innerHTML = `
                <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                    <i class="fa-solid fa-pen-to-square"></i>
                修改
                </a>
                <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                <i class="fa-solid fa-trash"></i>
                刪除
                </a>`;

                row.appendChild(categoryName);
                row.appendChild(operate);

                tbody.appendChild(row);
            });

        })
        .catch(error => {
            console.error('Error fetching the orders:', error);
        });
}



// 商品管理 - 商品選項
function loadProducts(){
    fetch("./data/Products.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `
        <h3>商品資訊管理</h3>
        <div class="container" style="background-color: white; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px;">
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- 左側的按鈕 -->
                            <button style="background-color: #ccc">新增商品資訊</button>

                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2" style="margin-bottom:7px">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="flex-grow-1">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">商品類別</th>
                            <th scope="col">商品名稱</th>
                            <th scope="col">商品價錢</th>                            
                            <th scope="col">是否上架</th>
                            <th scope="col">操作</th>
                            <th scope="col">加選類別</th>
                            
                        </tr>
                    </thead>
                    <tbody id="productTableBody">
                        <!-- Rows will be inserted here -->
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example" class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>`;

        const tbody = document.getElementById('productTableBody');
                data.Products.forEach(product => {
                    const row = document.createElement('tr');
                    const category = document.createElement('td');
                    category.innerText = product.ProductCategory;

                    const name = document.createElement('td');
                    name.innerText = product.Name;

                    const price = document.createElement('td');
                    price.innerText = product.Price;
                    const isDisplay = document.createElement('td');
                    isDisplay.innerText = product.IsDisplay;
                    const addOnCategories = document.createElement('td');
                    addOnCategories.innerText = product.AddOnCategories;
                    

                    const operate = document.createElement('td');
                    operate.innerHTML = `
                    <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                        <i class="fa-solid fa-pen-to-square"></i>
                    
                    </a>
                    <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                    <i class="fa-solid fa-trash"></i>
                    
                    </a>`;

                    row.appendChild(category);
                    row.appendChild(name);
                    row.appendChild(price);
                    row.appendChild(isDisplay);
                    row.appendChild(operate);
                    row.appendChild(addOnCategories);

                    tbody.appendChild(row);
                });
        ;})
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
    
};
// 商品管理 - 加選類別
function loadAddOnCategories(){
    fetch("./data/AddOnCategories.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `
            <h3>加選類別管理</h3>
            <div class="container" style="background-color: white; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px;">
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- 左側的按鈕 -->
                            <button style="background-color: #ccc">新增加選類別</button>

                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2" style="margin-bottom:7px">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="flex-grow-1">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">加選類別名稱</th>
                            <th scope="col">單選/複選</th>
                            <th scope="col">操作</th>
                            
                        </tr>
                    </thead>
                    <tbody id="addOnCategoryTableBody">
                        <!-- Rows will be inserted here -->
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example" class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>`;

        const tbody = document.getElementById('addOnCategoryTableBody');
                data.AddOnCategories.forEach(category => {
                    const row = document.createElement('tr');

                    const name = document.createElement('td');
                    name.innerText = category.Name;

                    const option = document.createElement('td');
                    option.innerText = category.Option;

                    const operate = document.createElement('td');
                    operate.innerHTML = `
                    <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                        <i class="fa-solid fa-pen-to-square"></i>
                    修改
                    </a>
                    <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                    <i class="fa-solid fa-trash"></i>
                    刪除
                    </a>`;

                    row.appendChild(name);
                    row.appendChild(option);
                    row.appendChild(operate);

                    tbody.appendChild(row);
                });
    
    })
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
   
};
// 商品管理 - 加選選項
function loadAddOnOptions() {
    fetch("./data/AddOnOptions.json")
        .then(response => response.json())
        .then(data => {
            const mainContent = document.querySelector('.main-content');
            mainContent.style.overflowY = 'auto';
            mainContent.innerHTML = `
            <h3 style="margin: 0 0 5px 0; padding: 0;">加選資訊管理</h3> <!-- Reduce margin and padding -->
            <div class="container" style="background-color: white; padding: 20px; padding-top:10px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px; position: relative;">
                <div class="row mb-3" style="margin-bottom: 10px;"> <!-- Adjust margin-bottom -->
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- 左側的按鈕 -->
                            <button style="background-color: #ccc">新增加選資訊</button>

                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2" style="margin-bottom:7px">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1" style="overflow: auto; flex: 1;">
                    <table class="table table-striped table-bordered" style="margin-bottom: 0;">
                        <thead>
                            <tr>
                                <th scope="col">加選資訊類別</th>
                                <th scope="col">加選資訊名稱</th>
                                <th scope="col">加選價錢</th>
                                <th scope="col">操作</th>
                            </tr>
                        </thead>
                        <tbody id="addOnTableBody">
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" style="margin-top: auto; padding-top: 20px;">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

            const tbody = document.getElementById('addOnTableBody');
            data.AddOnOptions.forEach(addOn => {
                const row = document.createElement('tr');

                const category = document.createElement('td');
                category.innerText = addOn.AddOnCategories;

                const name = document.createElement('td');
                name.innerText = addOn.AddOnName;

                const price = document.createElement('td');
                price.innerText = addOn.Price;

                const operate = document.createElement('td');
                operate.innerHTML = `
                <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                    <i class="fa-solid fa-pen-to-square"></i>
                修改
                </a>
                <a class="btn btn-light" style="color:#A9A9A9" href="#!" role="button">
                <i class="fa-solid fa-trash"></i>
                刪除
                </a>`;

                row.appendChild(category);
                row.appendChild(name);
                row.appendChild(price);
                row.appendChild(operate);

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching the orders:', error);
        });
}




// 會員管理 - 會員明細
function loadMemberDetails(){
    fetch("./data/MemberDetails.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `
        <h3>會員明細</h3>
        <div class="container" style="background-color: white; padding: 20px; padding-top:10px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px; position: relative;">
                <div class="row mb-3" style="margin-bottom: 10px;"> <!-- Adjust margin-bottom -->
                    <div class="col-12">
                        <div class="d-flex justify-content-end">
                            
                            
                            
                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1" style="overflow: auto; flex: 1;">
                    <table class="table table-striped table-bordered" style="margin-bottom: 0;">
                        <thead>
                            <tr>
                                <th scope="col">會員名稱</th>
                                <th scope="col">電子郵件</th>
                                <th scope="col">電話</th>
                                <th scope="col">點數</th>
                                <th scope="col">註冊日</th>
                            </tr>
                        </thead>
                        <tbody id="memberTableBody">
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" style="margin-top: auto; padding-top: 20px;">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

            const tbody = document.getElementById('memberTableBody');
            const maxRows = 7; // 設定表格最小行數
            data.MemberDetails.forEach(member => {
                const row = document.createElement('tr');

                const name = document.createElement('td');
                name.innerText = member.Name;

                const email = document.createElement('td');
                email.innerText = member.Email;

                const phone = document.createElement('td');
                phone.innerText = member.PhoneNumber;

                const points = document.createElement('td');
                points.innerText = member.Points;

                const registerDate = document.createElement('td');
                registerDate.innerText = member.RegisterDate;

                

                row.appendChild(name);
                row.appendChild(email);
                row.appendChild(phone);
                row.appendChild(points);
                row.appendChild(registerDate);

                tbody.appendChild(row);
            });
            // 補充空行
            const currentRowCount = data.MemberDetails.length;
            for (let i = currentRowCount; i < maxRows; i++) {
                const emptyRow = document.createElement('tr');
                for (let j = 0; j < 5; j++) {
                    const emptyCell = document.createElement('td');
                    emptyCell.innerHTML = "&nbsp;"; // 使用不間斷空格來佔位
                    emptyRow.appendChild(emptyCell);
                }
                tbody.appendChild(emptyRow);
            }
            
    })
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
   
};
// 會員管理 - 黑名單
function loadBlackList() {
    fetch("./data/BlackList.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
        <h3>黑名單管理</h3>
        <div class="container" style="background-color: white; padding: 20px; padding-top:10px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px; position: relative;">
                <div class="row mb-3" style="margin-bottom: 10px;">
                    <div class="col-12">
                        <div class="d-flex justify-content-end" style="margin-bottom:7px;">
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1" style="overflow: auto; flex: 1;">
                    <table class="table table-striped table-bordered" style="margin-bottom: 0; table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th scope="col">會員名稱</th>
                                <th scope="col">電子郵件</th>
                                <th scope="col">電話</th>                    
                                <th scope="col">註冊日</th>
                                <th scope="col">操作</th>
                            </tr>
                        </thead>
                        <tbody id="blackListTableBody">
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" style="margin-top: auto; padding-top: 20px;">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

        const tbody = document.getElementById('blackListTableBody');
        const maxRows = 7; // 設定表格最小行數
        data.BlackList.forEach(member => {
            const row = document.createElement('tr');

            const name = document.createElement('td');
            name.innerText = member.Name;

            const email = document.createElement('td');
            email.innerText = member.Email;

            const phone = document.createElement('td');
            phone.innerText = member.PhoneNumber;
            
            const registerDate = document.createElement('td');
            registerDate.innerText = member.RegisterDate;

            const operate = document.createElement('td');
            operate.style.textAlign = "center"; // Center horizontally
            operate.style.verticalAlign = "middle"; // Center vertically
            operate.style.padding = "0"; // Remove extra padding
            operate.style.border = "1px solid #dee2e6"; // Match the border style of other cells
            
            // Add button HTML
            operate.innerHTML = `
                <a class="btn btn-light" style="color:#A9A9A9; width: 80px; height: 30px; font-size: 12px; padding: 0; border: none; display: inline-flex; align-items: center; justify-content: center;" href="#!" role="button">
                    <i class="fa-solid fa-pen-to-square" style="font-size: 10px; margin-right: 3px;"></i>
                    解除封鎖
                </a>`;

            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(phone);
            row.appendChild(registerDate);
            row.appendChild(operate);

            tbody.appendChild(row);
        });

        // 補充空行
        const currentRowCount = data.BlackList.length;
        for (let i = currentRowCount; i < maxRows; i++) {
            const emptyRow = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                const emptyCell = document.createElement('td');
                emptyCell.innerHTML = "&nbsp;"; // 使用不間斷空格來佔位
                emptyCell.style.border = "1px solid #dee2e6"; // Match the border style of other cells
                emptyCell.style.padding = "8px"; // Consistent padding for uniform cell size
                emptyRow.appendChild(emptyCell);
            }
            tbody.appendChild(emptyRow);
        }
    })
    .catch(error => {
        console.error('Error fetching the orders:', error);
    });
}

// 會員管理 - 點數明細
function loadPointsDetails(){
    fetch("./data/PointsDetails.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `
        <h3>會員點數明細</h3>
        <div class="container" style="background-color: white; padding: 20px; padding-top:10px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px; position: relative;">
                <div class="row mb-3" style="margin-bottom: 10px;"> <!-- Adjust margin-bottom -->
                    <div class="col-12">
                        <div class="d-flex justify-content-end">
                            
                            
                            
                            <!-- 右側的搜索框和按鈕 -->
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="請輸入內容" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <button class="btn btn-light" type="button">搜尋</button>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1" style="overflow: auto; flex: 1;">
                    <table class="table table-striped table-bordered" style="margin-bottom: 0;">
                        <thead>
                            <tr>
                                <th scope="col">會員名稱</th>
                                <th scope="col">點數使用</th>
                                <th scope="col">點數使用日</th>
                            </tr>
                        </thead>
                        <tbody id="pointTableBody">
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" style="margin-top: auto; padding-top: 20px;">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

            const tbody = document.getElementById('pointTableBody');
            const maxRows = 7; // 設定表格最小行數
            data.PointsDetails.forEach(member => {
                const row = document.createElement('tr');

                const name = document.createElement('td');
                name.innerText = member.Name;

                const points = document.createElement('td');
                points.innerText = member.UsedPoints;

                const date = document.createElement('td');
                date.innerText = member.Date;


                row.appendChild(name);
                row.appendChild(points);
                row.appendChild(date);

                tbody.appendChild(row);
            });
            // 補充空行
            const currentRowCount = data.MemberDetails.length;
            for (let i = currentRowCount; i < maxRows; i++) {
                const emptyRow = document.createElement('tr');
                for (let j = 0; j < 5; j++) {
                    const emptyCell = document.createElement('td');
                    emptyCell.innerHTML = "&nbsp;"; // 使用不間斷空格來佔位
                    emptyRow.appendChild(emptyCell);
                }
                tbody.appendChild(emptyRow);
            }
        
    })
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
   
};
// 營業報告 - 營業概況
function loadOperationSummary(){
    fetch("./data/OperationRecords.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `<h3>營業概況</h3>`;})
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
  
};
// 營業報告 - 營業趨勢圖
function loadOperationGraph(){
    fetch("./data/StaticsMonth.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML= `<h3>營業趨勢圖</h3>`;})
    .catch(error => {
            console.error('Error fetching the orders:', error);
    });
   
};
// 訂單列表
function loadOrderList() {
    fetch("./data/OrderList.json")
    .then(response => response.json())
    .then(data => {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
        <h3>訂單列表</h3>
        <div class="container" style="background-color: white; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; min-height: 400px;">
        
        <div class="row mb-3">
            <div class="col-12">
                <div class="d-flex align-items-center flex-wrap" style="gap: 1rem;">
                    <!-- 左側的下拉選單 -->
                    <div class="dropdown me-2">
                        <a class="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            訂單狀態
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">已完成</a></li>
                            <li><a class="dropdown-item" href="#">處理中</a></li>
                            <li><a class="dropdown-item" href="#">已取消</a></li>
                        </ul>
                    </div>
    
                    <!-- 開始日期 -->
                    <div class="d-flex align-items-center me-2">
                        <label for="startDate" class="mb-0 me-1" style="margin-right: 0.5rem;">開始日期: </label>
                        <input type="date" id="startDate" class="form-control" aria-label="Start Date" style="flex: 1;">
                    </div>
    
                    <!-- 結束日期 -->
                    <div class="d-flex align-items-center me-2">
                        <label for="endDate" class="mb-0 me-1" style="margin-right: 0.5rem;">結束日期: </label>
                        <input type="date" id="endDate" class="form-control" aria-label="End Date" style="flex: 1;">
                    </div>

                    <!-- 搜尋 -->
                    <button class="btn btn-light" type="button">搜尋</button>
                    
                </div>
            </div>
        </div>
    
        <div class="flex-grow-1">
            <table class="table table-striped table-bordered" style="table-layout: fixed; width: 100%;">
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">下單時間</th>
                        <th scope="col">取餐時間</th>
                        <th scope="col">總金額</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col">會員名稱</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody id="orderTableBody">
                    <!-- Rows will be inserted here -->
                </tbody>
            </table>
        </div>
    
        <nav aria-label="Page navigation example" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    

        `;

        const tbody = document.getElementById('orderTableBody');
        const maxRows = 5; // 設定表格最小行數
        data.OrderList.forEach(order => {
            const row = document.createElement('tr');

            const id = document.createElement('td');
            id.innerText = order.OrderId;

            const orderTime = document.createElement('td');
            orderTime.innerText = order.OrderTime;

            const pickupTime = document.createElement('td');
            pickupTime.innerText = order.PickUpTime;

            const price = document.createElement('td');
            price.innerText = order.TotalPrice;

            const status = document.createElement('td');
            status.innerText = order.OrderStatus;

            const name = document.createElement('td');
            name.innerText = order.MemberName;

            const operate = document.createElement('td');
            operate.innerHTML = `
            <a class="btn btn-light" style="color:#9BA2A8; width: 80px; height: 30px; font-size: 12px; padding: 0; border-color:#CCD3DA  ; display: inline-flex; align-items: center; justify-content: center;" href="#!" role="button">
    <i class="fa-solid fa-circle-info" style="font-size: 14px; margin-right: 3px;"></i> 明細
</a>`;

            row.appendChild(id);
            row.appendChild(orderTime);
            row.appendChild(pickupTime);
            row.appendChild(price);
            row.appendChild(status);
            row.appendChild(name);
            row.appendChild(operate);

            tbody.appendChild(row);
        });

        // 補充空行
        const currentRowCount = data.OrderList.length;
        for (let i = currentRowCount; i < maxRows; i++) {
            const emptyRow = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const emptyCell = document.createElement('td');
                emptyCell.innerHTML = "&nbsp;"; // 使用不間斷空格來佔位
                emptyCell.style.border = "1px solid #dee2e6"; // Match the border style of other cells
                emptyCell.style.padding = "8px"; // Consistent padding for uniform cell size
                emptyRow.appendChild(emptyCell);
            }
            tbody.appendChild(emptyRow);
        }
    })
    .catch(error => {
        console.error('Error fetching the orders:', error);
    });
}



