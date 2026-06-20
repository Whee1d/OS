
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    
    const btn = document.querySelector('.btn-view-details');
    if (!btn) return; // 
    
    const form = btn.closest('form');
    if (!form) return; // 

    const fields = {
        name: { 
            input: form.querySelector('#name'), 
            error: form.querySelector('#nameError'),
            validate: (val) => val.trim().length >= 2,
            message: 'Введите имя (минимум 2 символа)'
        },
        phone: { 
            input: form.querySelector('#phone'), 
            error: form.querySelector('#phoneError'),
            validate: (val) => {
                const digits = val.replace(/\D/g, '');
                return digits.length === 11 && digits.startsWith('7');
            },
            message: 'Введите корректный номер (+7XXXXXXXXXX)'
        },
        question: { 
            input: form.querySelector('#question'), 
            error: form.querySelector('#questionError'),
            validate: (val) => val.trim().length >= 5,
            message: 'Вопрос должен быть длиннее 5 символов'
        }
    };

    const showError = (field) => {
        field.input.classList.add('input-error');
        if (field.error) field.error.textContent = field.message;
    };

    const clearError = (field) => {
        field.input.classList.remove('input-error');
        if (field.error) field.error.textContent = '';
    };

    Object.values(fields).forEach(field => {
        if (field.input) {
            field.input.addEventListener('input', () => clearError(field));
        }
    });
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        Object.values(fields).forEach(field => {
            if (field.input && !field.validate(field.input.value)) {
                showError(field);
                isValid = false;
            } else if (field.input) {
                clearError(field);
            }
        });

        if (isValid) {
            btn.disabled = true;
            const originalContent = btn.innerHTML;
            btn.innerHTML = 'Отправка...';

            setTimeout(() => {
                alert('Спасибо! Ваше сообщение успешно отправлено.');
                form.reset();
                btn.disabled = false;
                btn.innerHTML = originalContent;
            }, 1000);
        }
    });
});
