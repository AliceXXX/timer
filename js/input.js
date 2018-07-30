const VALID_MESSAGE_REQUIRED = "入力してくださいね-!✋";
const VALID_MESSAGE_PATTERN = "正しい構文で入力してくださいね-!✋";
const VALID_MESSAGE_TYPE = "指定されている形式で入力してくださいね-!✋";

$("work-title").each(function (index, elem) {
    elem.addEventListener("invalid", function (e) {
        if (elem.validity.valueMissing) {
            //要素が入力必須のフィールドであるのに値がない場合
            e.target.setCustomValidity(VALID_MESSAGE_REQUIRED);
        } else if (elem.validity.typeMismatch) {
            //要素の値が正しい構文ではない場合
            e.target.setCustomValidity(VALID_MESSAGE_TYPE);
        } else if (elem.validity.patternMismath) {
            //要素の値が与えられたパターンにマッチしない場合
            e.target.setCustomValidity(VALID_MESSAGE_PATTERN);
        }
    });
});
