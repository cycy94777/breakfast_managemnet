function loadOperationGraph() {
    fetch("./data/StaticMonth2.json")
        .then(response => response.json())
        .then(data => {
            
            const mainContent = document.querySelector('.main-content');
            mainContent.innerHTML = `
                <h3>營業趨勢圖</h3>
                <div class="container">
                    <div class="header">
                        <div class="date-range d-flex align-items-center">
                            <div class="d-flex align-items-center me-2">
                                <label for="startDate" class="mb-0 me-1" style="margin-right: 0.5rem;">開始日期: </label>
                                <input type="date" id="startDate" class="form-control" aria-label="Start Date" style="flex: 1;">
                            </div>
                            <div class="d-flex align-items-center me-2">
                                <label for="endDate" class="mb-0 me-1" style="margin-right: 0.5rem;">結束日期: </label>
                                <input type="date" id="endDate" class="form-control" aria-label="End Date" style="flex: 1;">
                            </div>
                            <button class="btn btn-light" type="button">搜尋</button>
                        </div>
                    </div>
                    <div class="graphs">
                        <div class="graph-item">
                            <i class="fa-solid fa-sack-dollar"><span class="text">營業額</span></i>
                            <div class="bar-container">
                                <canvas id="salesBar"></canvas>
                            </div>
                        </div>
                        <div class="graph-item">
                            <i class="fa-solid fa-user"><span class="text">會員數</span></i>
                            <div class="bar-container">
                                <canvas id="membersLine"></canvas>
                            </div>
                        </div>
                        <div class="graph-item">
                            <i class="fa-solid fa-burger"><span class="text">熱銷商品</span></i>
                            <div class="bar-container" id="table-container">
                                <div id="productsTable"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>

                    .hidden-overflow {
                        overflow: hidden !important; /* Applied when needed */
                    }

                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-bottom: 10px;
                        margin-bottom: 8px;
                    }

                    .date-range input {
                        margin: 0 5px;
                        padding: 5px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }

                    .date-range button {
                        padding: 6px 12px;
                        background-color: #e6e6e6;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        color: #A2A2A2  !important;
                    }

                    .graphs {
                        display: flex;
                        justify-content: space-between;
                        padding: 14px;                        
                        background-color: #f1f1f1;
                        border-radius: 10px;
                        height: 350px;
                    }

                    .graph-item {
                        flex: 1;
                        text-align: center;
                        padding: 10px;
                        border-radius: 10px;
                        margin: 0 15px;
                        background-color: #ffffff;
                    }

                    .graph-item i {
                        font-size: 22px;
                        margin-bottom: 10px;
                    }

                    .graph-item .text {
                        margin-left: 0.5rem;
                    }

                    .fa-sack-dollar {
                        color: #f0ad4e;
                    }

                    .fa-burger {
                        color: #F18FC3;
                    }

                    .fa-user {
                        color: #A2D895;
                    }

                    .bar-container {
                        width: 100%;
                        height: 100%;
                        margin: 0 auto;
                        position: relative;
                        padding-bottom: 20px;
                        justify-content: center; /* Center the table horizontally */
                        align-items: center;     /* Center the table vertically */
                    }

                    #salesBar {
                        width: 100% !important;
                        height: 100% !important;
                    }

                    #membersLine {
                        width: 100% !important;
                        height: 100% !important;
                    }

                    #productsTable {
                        width: 70%; /* Adjust this percentage to control the table's width */
                        margin: 0 auto; /* Center the table within its container */
                        padding-top: 20px;
                        height: auto; /* Allow the height to adjust based on content */
                                        }
                    
                    #custom-header {
                        background-color: #DA99BE !important; /* Replace with your preferred color */
                        color: #343a40; /* Text color */
                    }
                                    
            

                </style>
            `;

            // 等待 DOM 加載完成後初始化圖表
            initSalesChart(data);
            initMembersChart(data);
            initProductsTable(data);
            mainContent.classList.add('hidden-overflow');
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

function initSalesChart(data) {
    const ctx = document.getElementById('salesBar').getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.months, // 假设数据包含 'months' 属性
                datasets: [{
                    data: data.sales, // 假设数据包含 'sales' 属性
                    backgroundColor: 'rgba(221, 205, 138, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 500,
                            callback: function(value) {
                                return value;
                            }
                        },
                        min: 3000,
                        max: 5500
                    }
                }
            }
        });
    } else {
        console.error('Canvas element not found!');
    }
}


function initMembersChart(data) {
    const ctx = document.getElementById('membersLine').getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.months, // 假设数据包含 'months' 属性
                datasets: [{
                    data: data.members, // 假设数据包含 'sales' 属性
                    backgroundColor: 'rgba( 124, 209, 166, 0.5)',
                    hoverBackgroundColor: 'rgba(103, 183, 118 , 0.9)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: true,
                    borderWidth: 0,
                    pointRadius: 4
                    
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10,
                            callback: function(value) {
                                return value;
                            }
                        },
                        min: 0,
                        max: 50
                    }
                }
            }
        });
    } else {
        console.error('Canvas element not found!');
    }
}


function initProductsTable(data) {
    const tableContainer = document.getElementById('productsTable');
    if (tableContainer) {
        let tableHTML = `
        <table class="table table-striped">
            <thead id="custom-header">
                <tr>
                    <th scope="col" style="background-color: #F4B8DA !important; color: #343a40; border: 6px solid #EAB0D1; text-align: center; border-radius: 3px;">商品</th>
                    <th scope="col" style="background-color: #F4B8DA !important; color: #343a40; border: 6px solid #EAB0D1; text-align: center; border-radius: 3px">數量</th>
                </tr>
            </thead>
            <tbody>`;
            data.products.forEach((product, index) => {
                tableHTML += `
                    <tr>
                        <td>${product}</td>
                        <td>${data.quantity[index]}</td>
                    </tr>
                `;
            });
            tableHTML += `</tbody>
            </table>
            `;
        
        tableContainer.innerHTML = tableHTML;
    
    } else {
        console.error('Canvas element not found!');
    }
}