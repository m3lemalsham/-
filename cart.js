document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const checkoutButton = document.querySelector('.checkout-btn');
    const toggleCartBtn = document.querySelector('.toggle-cart-btn');
    const discountCodeInput = document.getElementById('discountCode');
    const applyCouponBtn = document.getElementById('applyCoupon');
    const discountElement = document.querySelector('.discount');
    const subtotalElement = document.querySelector('.subtotal span');
    const finalTotalElement = document.querySelector('.final-total span');
    const couponMessage = document.querySelector('.coupon-message');
    let cart = [];
    let isCartVisible = true;
    let activeDiscount = 0;

    // تعريف أكواد الخصم المتاحة والعداد
    const availableCoupons = {
        'رمضان': 10 // 10% خصم
    };
    
    // إضافة كائن لتتبع عدد مرات استخدام كل كود
    const couponUsage = JSON.parse(localStorage.getItem('couponUsage')) || {};

    // إضافة متغيرات جديدة لتتبع طريقة الدفع والاستلام
    let paymentMethod = 'cash';
    let deliveryMethod = 'delivery';

    // تعريف عرض المسابقة
    const contestProduct = {
        id: 'contest-meal1',
        name: 'صحن فلافل عربي مشكل - صغير',
        price: 13,
        originalPrice: 13
    };

    // التحقق من كود المسابقة
    const applyContestCodeBtn = document.getElementById('applyContestCode');
    const contestCodeInput = document.getElementById('contestCode');
    const contestMessage = document.querySelector('.contest-message');

    applyContestCodeBtn.addEventListener('click', () => {
        const code = contestCodeInput.value.trim();
        const savedQuizCode = localStorage.getItem('quizCode');
        contestMessage.className = 'contest-message';

        if (!code) {
            contestMessage.textContent = 'الرجاء إدخال كود المسابقة';
            contestMessage.classList.add('error');
            return;
        }

        // التحقق من الكود
        if (code === savedQuizCode) {
            // التحقق من أن عرض المسابقة غير موجود مسبقاً في السلة
            const existingContestItems = cart.filter(item => item.isContestItem);
            
            if (existingContestItems.length > 0) {
                contestMessage.textContent = 'تم استخدام هذا الكود مسبقاً!';
                contestMessage.classList.add('error');
                return;
            }

            // إضافة المنتجات الثلاثة كمجموعة واحدة
            const contestGroup = {
                groupId: 'contest-group-' + Date.now(),
                items: [
                    {
                        id: contestProduct.id + '-1',
                        name: contestProduct.name,
                        price: contestProduct.price,
                        quantity: 1,
                        isContestItem: true,
                        contestGroupId: 'contest-group-' + Date.now()
                    },
                    {
                        id: contestProduct.id + '-2',
                        name: contestProduct.name,
                        price: contestProduct.price,
                        quantity: 1,
                        isContestItem: true,
                        contestGroupId: 'contest-group-' + Date.now()
                    },
                    {
                        id: contestProduct.id + '-3',
                        name: contestProduct.name + ' (مجاناً)',
                        price: 0,
                        quantity: 1,
                        isContestItem: true,
                        isFreeItem: true,
                        contestGroupId: 'contest-group-' + Date.now()
                    }
                ]
            };

            // إضافة المجموعة للسلة
            cart.push(...contestGroup.items);
            
            // تحديث السلة
            updateCart();
            
            // إظهار رسالة النجاح
            contestMessage.textContent = 'تم إضافة عرض المسابقة: اشترِ صحنين واحصل على الثالث مجاناً!';
            contestMessage.classList.add('success');
            
            // تعطيل حقل الإدخال والزر
            contestCodeInput.disabled = true;
            applyContestCodeBtn.disabled = true;
            
            // إضافة رسالة نجاح متحركة
            showCartMessage('تم إضافة عرض المسابقة بنجاح!', 'success');
            
            // حذف الكود من localStorage
            localStorage.removeItem('quizCode');
        } else {
            contestMessage.textContent = 'عذراً، كود المسابقة غير صالح أو منتهي الصلاحية';
            contestMessage.classList.add('error');
        }
    });

    // التحكم في إخفاء/إظهار السلة
    toggleCartBtn.addEventListener('click', () => {
        isCartVisible = !isCartVisible;
        toggleCartBtn.classList.toggle('hidden');
        cartIcon.classList.toggle('hidden');
        toggleCartBtn.innerHTML = isCartVisible ? 
            '<i class="fas fa-eye"></i>' : 
            '<i class="fas fa-eye-slash"></i>';
        
        if (!isCartVisible && cartSidebar.classList.contains('open')) {
            closeCartSidebar();
        }
    });

    // فتح السلة
    cartIcon.addEventListener('click', () => {
        if (isCartVisible) {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('show');
        }
    });

    // إغلاق السلة
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
    }

    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // إضافة منتج للسلة
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            
            // إضافة تأثير حركي للزر
            button.classList.add('added');
            
            // تحريك أيقونة السلة
            document.querySelector('.cart-icon').classList.add('shake');
            
            // إضافة المنتج للسلة
            addToCart(id, name, price);
            
            // إزالة التأثيرات بعد لحظات
            setTimeout(() => {
                button.classList.remove('added');
                document.querySelector('.cart-icon').classList.remove('shake');
            }, 1000);
        }
    });

    // إضافة منتج
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    // تحديث عرض السلة
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const isContestItem = item.isContestItem;
            subtotal += item.price * item.quantity;
            
            cartItemsContainer.innerHTML += `
                <div class="cart-item ${isContestItem ? 'contest-item' : ''}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${item.isFreeItem ? 
                            `<del>${contestProduct.originalPrice} ريال</del> <span class="free-badge">مجاناً!</span>` : 
                            `${item.price} ريال × ${item.quantity}`}</p>
                    </div>
                    <div class="item-controls">
                        ${isContestItem ? '' : `
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        `}
                        <button class="remove-btn" data-id="${item.id}" onclick="removeItem('${item.id}')">${isContestItem ? 'حذف العرض' : '×'}</button>
                    </div>
                </div>
            `;
        });

        // تحديث المجاميع
        subtotalElement.textContent = subtotal.toFixed(2) + ' ريال';
        
        // حساب الخصم
        const discountAmount = (subtotal * activeDiscount) / 100;
        const finalTotal = subtotal - discountAmount;
        
        if (activeDiscount > 0) {
            discountElement.classList.remove('hidden');
            discountElement.querySelector('span').textContent = discountAmount.toFixed(2) + ' ريال';
        } else {
            discountElement.classList.add('hidden');
        }
        
        finalTotalElement.textContent = finalTotal.toFixed(2) + ' ريال';
        document.querySelector('.cart-count').textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // التحكم بالكمية
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const id = e.target.dataset.id;
            const item = cart.find(item => item.id === id);
            if (e.target.classList.contains('plus')) {
                item.quantity++;
            } else if (e.target.classList.contains('minus')) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
            }
            updateCart();
        } else if (e.target.classList.contains('remove-btn')) {
            const id = e.target.dataset.id;
            removeItem(id);
        }
    });

    // تطبيق كود الخصم
    applyCouponBtn.addEventListener('click', () => {
        const code = discountCodeInput.value.trim();
        couponMessage.className = 'coupon-message';
        
        if (code in availableCoupons) {
            activeDiscount = availableCoupons[code];
            couponMessage.textContent = `تم تطبيق كود الخصم بنجاح! (${activeDiscount}% خصم)`;
            couponMessage.classList.add('success');
            updateCart();
        } else {
            couponMessage.textContent = 'عذراً، كود الخصم غير صالح';
            couponMessage.classList.add('error');
            activeDiscount = 0;
            updateCart();
        }
    });

    // التحكم في خيارات الدفع
    document.querySelectorAll('input[name="payment"]').forEach(input => {
        input.addEventListener('change', (e) => {
            paymentMethod = e.target.value;
        });
    });

    // التحكم في خيارات الاستلام وإظهار/إخفاء تفاصيل العنوان
    document.querySelectorAll('input[name="delivery"]').forEach(input => {
        input.addEventListener('change', (e) => {
            deliveryMethod = e.target.value;
            const addressDetails = document.getElementById('addressDetails');
            const districtInput = document.getElementById('customerDistrict');
            const streetInput = document.getElementById('customerStreet');
            
            if (deliveryMethod === 'pickup') {
                addressDetails.classList.add('hidden');
                // جعل حقول العنوان غير مطلوبة
                districtInput.required = false;
                streetInput.required = false;
                // إزالة القيم من حقول العنوان
                districtInput.value = '';
                streetInput.value = '';
            } else {
                addressDetails.classList.remove('hidden');
                // جعل حقول العنوان مطلوبة
                districtInput.required = true;
                streetInput.required = true;
            }
        });
    });

    // دالة لإضافة رسائل في السلة
    function showCartMessage(message, type = 'error') {
        const messagesContainer = document.querySelector('.cart-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `cart-message ${type}`;
        
        // إضافة أيقونة مناسبة حسب نوع الرسالة
        let icon = '';
        switch(type) {
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
        }
        
        messageElement.innerHTML = `${icon}${message}`;
        
        // إضافة الرسالة في بداية حاوية الرسائل
        messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
        
        // حذف الرسالة بعد 5 ثواني
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => messageElement.remove(), 300);
        }, 5000);
    }

    // إرسال الطلب عبر الواتساب
    checkoutButton.addEventListener('click', () => {
        const cartMessages = document.querySelector('.cart-messages');
        cartMessages.innerHTML = ''; // مسح الرسائل السابقة

        // التحقق من وجود منتجات في السلة
        if (cart.length === 0) {
            showCartMessage('لا يمكن إرسال الطلب، السلة فارغة!');
            return;
        }

        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const phone2 = document.getElementById('customerPhone2').value;
        const details = document.getElementById('customerDetails').value;
        
        // التحقق من البيانات المطلوبة
        if (!name || !phone) {
            showCartMessage('الرجاء إدخال الاسم ورقم الجوال', 'warning');
            return;
        }

        // التحقق من بيانات العنوان إذا كان التوصيل للمنزل
        if (deliveryMethod === 'delivery') {
            const district = document.getElementById('customerDistrict').value;
            const street = document.getElementById('customerStreet').value;
            
            if (!district || !street) {
                showCartMessage('الرجاء إدخال بيانات العنوان كاملة للتوصيل المنزلي', 'warning');
                return;
            }
        }

        // تجهيز نص الرسالة
        let message = `*طلب جديد من معلم الشام*%0a%0a`;
        message += `*بيانات العميل:*%0a`;
        message += `الاسم: ${name}%0a`;
        message += `الجوال: ${phone}%0a`;
        if (phone2) message += `جوال إضافي: ${phone2}%0a`;
        if (details) message += `ملاحظات: ${details}%0a`;
        
        // إضافة طريقة الدفع والاستلام
        message += `طريقة الدفع: ${paymentMethod === 'cash' ? 'كاش' : 'شبكة'}%0a`;
        message += `طريقة الاستلام: ${deliveryMethod === 'delivery' ? 'توصيل للمنزل' : 'استلام من الفرع'}%0a`;

        // إضافة تفاصيل العنوان إذا كان التوصيل للمنزل
        if (deliveryMethod === 'delivery') {
            const district = document.getElementById('customerDistrict').value;
            const street = document.getElementById('customerStreet').value;
            
            if (!district || !street) {
                alert('الرجاء إدخال بيانات العنوان كاملة للتوصيل المنزلي');
                return;
            }
            
            message += `الحي: ${district}%0a`;
            message += `الشارع: ${street}%0a`;
        }
        
        message += `%0a*تفاصيل الطلب:*%0a`;
        cart.forEach(item => {
            message += `${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} ريال%0a`;
        });
        
        // إضافة معلومات الخصم للرسالة
        if (activeDiscount > 0) {
            const subtotal = parseFloat(subtotalElement.textContent);
            const discountAmount = (subtotal * activeDiscount) / 100;
            const appliedCoupon = discountCodeInput.value.trim();
            
            // تحديث عدد مرات استخدام الكود عند إرسال الطلب
            couponUsage[appliedCoupon] = (couponUsage[appliedCoupon] || 0) + 1;
            localStorage.setItem('couponUsage', JSON.stringify(couponUsage));
            
            const couponUseCount = couponUsage[appliedCoupon];
            
            message += `%0a*معلومات الخصم:*%0a`;
            message += `كود الخصم المستخدم: ${appliedCoupon}%0a`;
            message += `عدد مرات استخدام الكود: ${couponUseCount}%0a`;
            message += `قيمة الخصم: ${discountAmount.toFixed(2)} ريال%0a`;
        }
        
        message += `%0a*المجموع النهائي: ${finalTotalElement.textContent}*`;

        // فتح الواتساب مع الرسالة المجهزة
        window.open(`https://wa.me/966594872016?text=${message}`);
        
        // تفريغ السلة بعد إرسال الطلب
        cart = [];
        activeDiscount = 0;
        discountCodeInput.value = '';
        updateCart();
        closeCartSidebar();
    });

    // تحديث دالة حذف المنتج لتتعامل مع مجموعة المسابقة
    function removeItem(id) {
        const item = cart.find(item => item.id === id);
        if (item && item.isContestItem) {
            // إذا كان المنتج جزء من عرض المسابقة، نحذف المجموعة كاملة
            const groupId = item.contestGroupId;
            cart = cart.filter(item => item.contestGroupId !== groupId);
            
            // إعادة تفعيل حقل إدخال كود المسابقة
            contestCodeInput.disabled = false;
            applyContestCodeBtn.disabled = false;
            contestCodeInput.value = '';
            contestMessage.textContent = '';
            contestMessage.className = 'contest-message';
        } else {
            // حذف منتج عادي
            cart = cart.filter(item => item.id !== id);
        }
        updateCart();
    }
});