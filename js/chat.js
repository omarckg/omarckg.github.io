document.addEventListener('DOMContentLoaded', function() {
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const chatWidget = document.getElementById('chatWidget');
    const startChatBtn = document.getElementById('startChat');

    openChatBtn.addEventListener('click', function() {
        chatWidget.classList.remove('hidden');
    });

    closeChatBtn.addEventListener('click', function() {
        chatWidget.classList.add('hidden');
    });

    startChatBtn.addEventListener('click', function() {
        window.location.href = "https://wa.me/573170986273";
    });
});
