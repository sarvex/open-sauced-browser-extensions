/**
 * This is a rudimentary way to pick up the owner and repo name
 * when visiting a repo URL.
 * 
 * We should probably be looking at refined-github/github-url-detection
 */
const currentUrl = new URL(window.location.href);
const [_, owner, repo] = currentUrl.pathname.split("/");

/**
 * Pull the autoSuggest option from storage, defaulting to true.
 * This doesn't work as expected...
 */
const {autoSuggest} = chrome.storage.sync.get({autoSuggest: true});
/**
 * When inspecting the star button on a GitHub repo, this is one selector that seems to find it.
 * 
 * The form element has an action attribute that ends with "/star", and there is a submit button 
 * inside of it.
 * 
 * One of these is the star button at the top. It seems like there's another one inside a dialog 
 * that's normally hidden, so we may want to listen to this too.
 */
const starButtonSelector = "form[action$=\"/star\"] button[type=\"submit\"]";
const starButtons = Array.from(document.querySelectorAll(starButtonSelector));
starButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("User Starred", {owner, repo, autoSuggest});
        // We don't get through this if statement because
        // chrome.storage.sync.get doesn't work as expected.
        if(autoSuggest === true){
            // I do not think this PUT fetch works (gives me 404)
            fetch(`https://api.opensauced.pizza/v1/${owner}/${repo}/submit`, {
                method: "PUT"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        }
    });
});