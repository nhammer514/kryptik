module.exports = function (eleventyConfig){
    eleventyConfig.addPassthroughCopy("_src/_includes/");
    eleventyConfig.addPassthroughCopy("./_src/css/");
    eleventyConfig.addPassthroughCopy("./_src/images/");
    eleventyConfig.addPassthroughCopy("./_src/scripts/");
    
    return{
        dir: {
            input: "_src",
            output: "_site"
        },
      };
};