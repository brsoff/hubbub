
//INTERPOLATE FOR UNDERSCORE TEMPLATE NOW {{=}}
//EVALUATE {{}}
_.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
};