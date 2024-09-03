// // Add EventLister

// // // 主畫面左側功能選單 子清單設定
// 
document.addEventListener('DOMContentLoaded', function () {
    // 處理父選項的點擊
    var toggleLinks = document.querySelectorAll('.toggle-submenu');
    
    toggleLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var submenu = this.nextElementSibling.querySelector('.submenu');
            
            // 隱藏所有子選單
            document.querySelectorAll('.submenu').forEach(function(sub) {
                if (sub !== submenu) {
                    sub.style.display = 'none';
                }
            });
            
            // 切換子選單的可見性
            if (submenu.style.display === "block") {
                submenu.style.display = "none";
            } else {
                submenu.style.display = "block";
            }
        });
    });

    // 設定 active 的功能選項
    const sidebarItems = document.querySelectorAll('.nav-link');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // 防止點擊事件傳遞到子選項
            event.stopPropagation();

            // Remove 'active' class from all sidebar items
            sidebarItems.forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
                const submenuWrapper = navItem.querySelector('.submenu-wrapper');
                if (submenuWrapper) {
                    submenuWrapper.style.display = 'none';
                }
            });

            // Add 'active' class to the clicked sidebar item
            this.classList.add('active');
            const parentNavItem = this.closest('.nav-item');
            if (parentNavItem) {
                parentNavItem.classList.add('active');
                const submenuWrapper = parentNavItem.querySelector('.submenu-wrapper');
                if (submenuWrapper) {
                    submenuWrapper.style.display = submenuWrapper.style.display === 'block' ? 'none' : 'block';
                }
            }
            // Display content for clicked item, if it is not a submenu link
            if (this.classList.contains('toggle-submenu')) {
                return; // Do not show content for parent menu items
            }

            // Load the appropriate content
            const contentId = this.id;
            loadContent(contentId);
        });
    });

    // 設定子選項點擊處理
    const submenuLinks = document.querySelectorAll('.submenu .nav-link');
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 防止點擊子選項時觸發父選項的點擊事件
            event.stopPropagation();

            // 保持子選項展開狀態
            const parentNavItem = this.closest('.nav-item');
            if (parentNavItem) {
                const parentNavLink = parentNavItem.querySelector('.nav-link');
                if (parentNavLink) {
                    // Remove 'active' class from all sidebar items
                    sidebarItems.forEach(el => el.classList.remove('active'));
                    
                    // Add 'active' class to the parent nav item
                    parentNavLink.classList.add('active');
                }
                parentNavItem.classList.add('active');
                const submenuWrapper = parentNavItem.querySelector('.submenu-wrapper');
                if (submenuWrapper) {
                    submenuWrapper.style.display = 'block';
                }
            }
            
            // 為當前點擊的子選項添加 'active' 類別
            this.classList.add('active');
            // Load the appropriate content
            const contentId = this.id;
            loadContent(contentId);
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // 頁面載入時顯示「待處理訂單的資訊」
    loadPendingOrders();
    
    // 假設首頁連結的ID為 'home-link'
    const homeLink = document.getElementById('home-link');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // 防止默認行為
        loadPendingOrders();
    });
});

function loadContent(contentId) {
    switch(contentId) {
        case 'home-link':
            loadPendingOrders();
            break;
        case 'account':
            loadManagementAccounts();
            break;
        case 'ProductCategory':
            loadProductCategories();
            break;
        case 'Product':
            loadProducts();
            break;
        case 'AddOnCategory':
            loadAddOnCategories();
            break;
        case 'AddOnOption':
            loadAddOnOptions();
            break;
        case 'memberDetail':
            loadMemberDetails();
            break;
        case 'blackList':
            loadBlackList();
            break;
        case 'pointDetail':
            loadPointsDetails();
            break;
        case 'operationSummary':
            mainContent.innerHTML = `<h1>營業概況</h1><p>這裡是營業概況的內容展示區域。</p>`;
            break;
        case 'operationGraph':
            mainContent.innerHTML = `<h1>營業趨勢圖</h1><p>這裡是營業趨勢圖的內容展示區域。</p>`;
            break;
        case 'orderList':
            loadOrderList();
            break;
        default:
            loadPendingOrders();
    }
}

