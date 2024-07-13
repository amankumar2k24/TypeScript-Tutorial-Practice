"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
// async function myCustomFetcher<T>(url: string, options?: RequestInit): Promise<T> {
const myCustomFetcher = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response is not Ok - status : ${response.status}`);
    }
    const data = await response.json();
    console.log("data=>", data);
    return data;
};
function showResultUI(singleUser) {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class="card">
           <img src=${avatar_url} alt=${login} />
           <hr/>
           <div class="card-footer">
             <img src="${avatar_url}" alt="${login}" />
             <a href="${url}" target="_blank"> ${login} <a/>
           </div>
        </div>`);
}
// defining fetchUserData 
// function fetchUserData(url: string) {
//     myCustomFetcher<UserData[]>(url, {}).then((userInfo) => {
//         for (const singleUser of userInfo) {
//             showResultUI(singleUser)
//         }
//     })
// }
// OR 
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        userInfo.map((singleUser) => {
            showResultUI(singleUser);
        });
    });
}
// calling fetchUserData
fetchUserData("https://api.github.com/users");
// UserData showing end ==================================================================================>
// searchUser showing start ==================================================================================>
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        // we need to clear the previous data 
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class="empty-msg"> No User Found</p>`);
        }
        else {
            matchingUsers.map((singleUser) => {
                showResultUI(singleUser);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
// searchUser showing end   ==================================================================================>