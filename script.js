$(document.body).ready(function(){
    let defaultEmojiDelay = 0.2;
    let senderActive = -1;
    let meActive = -1;
    const emojisCount = $('.emojis-deck img').length;

    setActiveHover();

    $(document).on('click', function(){
        const meContainer = $('.me .react-cta');
        const senderContainer = $('.sender .react-cta');
        if (!meContainer.is(event.target) && !meContainer.has(event.target).length) {
            $('.me .emojis-deck').addClass('close');
        }
        if (!senderContainer.is(event.target) && !senderContainer.has(event.target).length) {
            $('.sender .emojis-deck').addClass('close');
        }
    });

    $('.emojis-deck img').map((idx, item) => {
        if (idx === emojisCount/2) defaultEmojiDelay = 0.2;
        defaultEmojiDelay += 0.03;
        $(item).css('transition-delay', `${defaultEmojiDelay}s`);
    });

    $(document.body).on('click', '.emojis-deck div', function(){
        const emojiIndex = $(this).attr('data-emoji-index');
        const imgSrc = $(`.emoji-${emojiIndex}`)[0].value;
        const isSender = $(this).parents('.sender').length !== 0;
        let parent;
        if (isSender){
            parent = 'sender';
            senderActive = parseInt(emojiIndex);
        }
        else{
            parent = 'me';
            meActive = parseInt(emojiIndex);
        }
        const reactionContainer = $(`.${parent} .active-reaction`);
        const reactionImage = jQuery('img', reactionContainer);
        reactionImage.attr('src', imgSrc);
        reactionImage.addClass('bump');
        setTimeout(() => {
            reactionImage.removeClass('bump');
        }, 300);
        reactionContainer.addClass('active');
        setActiveHover();
    });

    $(document.body).on('click', '.react-cta', function(){
        const deck = jQuery('.emojis-deck', $(this));
        deck.toggleClass('close');
    });

    $(document.body).on('click', '.active-reaction.active', function(){
        const isSender = $(this).parents('.sender').length !== 0;
        if (isSender){
            senderActive = -1;
            $('.sender .active-reaction').removeClass('active');
        }
        else{
            meActive = -1;
            $('.me .active-reaction').removeClass('active');
        }
        setActiveHover();
    });

    function setActiveHover(){
        $('.emojis-deck div').map((idx, item) => {
            $(item).removeClass('active');
            if (meActive == -1){
                $(item).removeClass('active'); 
            }
            if (senderActive == -1){
                $(item).removeClass('active');
            }
            if (meActive !== -1){
                if (idx == meActive - 1) $(item).addClass('active');
            }
            if (senderActive !== -1){
                if (idx == senderActive + emojisCount/2 - 1) $(item).addClass('active');
            }
        });
    }
});