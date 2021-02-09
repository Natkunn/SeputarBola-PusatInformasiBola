const base_url = "https://api.football-data.org/v2/";
const api_token = "ca53aee8d6f34afb927b48efbfb6b8c0";

const status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = response => response.json();

// function error(error) {
//   // Parameter error berasal dari Promise.reject()
//   console.log("Error : " + error);
// }

const getTable = () => {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings").then(response => {
      if (response) {
        response.json().then(data => {
          let standingsHTML = "";
          data.standings[0].table.forEach(standing => {
            let crestUrl = standing.team.crestUrl.replace(/^http:\/\//i, "https://");
            standingsHTML += `
                        <tr>
                          <th>${standing.position}</th>
                          <td colspan="2">
                            <a href="./detail-team.html?id=${standing.team.id}">
                              <img class="standing-img" src="${crestUrl}"> ${standing.team.name}
                            </a>
                          </td>
                          <td>${standing.won}</td>
                          <td>${standing.draw}</td>
                          <td>${standing.lost}</td>
                          <td>${standing.goalsFor}</td>
                          <td>${standing.goalsAgainst}</td>
                          <td>${standing.goalDifference}</td>
                          <td>${standing.points}</td>
                        </tr>
                  `;
          });
          document.getElementById("klasemen").innerHTML = standingsHTML;
        })
      }
    })
  }
  fetch(base_url + "competitions/2021/standings", {
    headers: {
      "X-Auth-Token": api_token,
    },
  })
    .then(status)
    .then(json)
    .then(data => {
      let standingsHTML = "";
      data.standings[0].table.forEach(standing => {
        let crestUrl = standing.team.crestUrl.replace(/^http:\/\//i, "https://");
        standingsHTML += `
            <tr>
            <th>${standing.position}</th>
            <td colspan="2">
              <a href="./detail-team.html?id=${standing.team.id}">
                <img class="standing-img" src="${crestUrl}"> ${standing.team.name}
              </a>
            </td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            <td>${standing.points}</td>
            </tr>
              `;
      });
      document.getElementById("klasemen").innerHTML = standingsHTML;
    })
  // .catch(error);
}

const getTeams = () => {
  if ('caches' in window) {
    caches.match(base_url + "teams").then(response => {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          data.teams.forEach(team => {
            teamsHTML += `
                  <div class="col s6 m4 l3">
                    <div class="card team-card">
                      <a href="./detail-team.html?id=${team.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" />
                        </div>
                        <div class="card-content">
                          <h6 class="green-text text-darken-4">${team.name}</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                  `;
          });
          document.getElementById("teams").innerHTML = teamsHTML;
        })
      }
    })
  }
  fetch(base_url + "teams", {
    headers: {
      "X-Auth-Token": api_token,
    },
  })
    .then(status)
    .then(json)
    .then(data => {
      let teamsHTML = "";
      data.teams.forEach(team => {
        teamsHTML += `
              <div class="col s6 m4 l3">
                <div class="card team-card">
                  <a href="./detail-team.html?id=${team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${team.crestUrl}" />
                    </div>
                    <div class="card-content">
                    <h6 class="green-text text-darken-4">${team.name}</h6>
                    </div>
                  </a>
                </div>
              </div>
              `;
      });
      document.getElementById("teams").innerHTML = teamsHTML;

    })
  // .catch(error);
}

const getTeamById = () => {
  return new Promise(resolve => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            let teamHTML = `
              <div class="card detail">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="detail-img" src="${data.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <span>Since ${data.founded}</span>
                  <table>
                    <tbody>
                      <tr>
                        <td>Alamat</td>
                        <td>${data.address}</td>
                      </tr>
                      <tr>
                        <td>No. Telp</td>
                        <td>${data.phone}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>${data.email}</td>
                      </tr>
                      <tr>
                        <td>Stadion</td>
                        <td>${data.venue}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-action">
                  <a href="${data.website}" target="_blank">Pergi ke Website Resmi ${data.name}</a>
                </div>
              </div>
            `;

            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": api_token,
      },
    })
      .then(status)
      .then(json)
      .then(data => {
        let teamHTML = `
                <div class="card detail">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="detail-img" src="${data.crestUrl}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <span>Since ${data.founded}</span>
                    <table>
                      <tbody>
                        <tr>
                          <td>Alamat</td>
                          <td>${data.address}</td>
                        </tr>
                        <tr>
                          <td>No. Telp</td>
                          <td>${data.phone}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>${data.email}</td>
                        </tr>
                        <tr>
                          <td>Stadion</td>
                          <td>${data.venue}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-action">
                    <a href="${data.website}" target="_blank">Pergi ke Website Resmi ${data.name}</a>
                  </div>
                </div>
          `;
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}

const getSavedTeams = () => {
  getAll().then(teams => {
    let teamsHTML = "";
    teams.forEach(team => {
      teamsHTML += `
                  <div class="col s6 m4 l3">
                    <div class="card">
                      <a href="./detail-team.html?id=${team.id}&saved=true">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img class="team-card2" src="${team.crestUrl}"/>
                          </div>                     
                        <div class="card-content">
                          <span class="card-title truncate">${team.name}</span>
                        </div>
                        <div class="card-action">
                          <h6 class="green-text text-darken-2">Baca Detail</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                  `;
    });
    if (teamsHTML == '') {
      document.getElementById("save-page").innerHTML = '<h5>Tidak ada tim yang tersimpan</h5>';
    }
    else {
      document.getElementById("save-page").innerHTML = teamsHTML;
    }
  });
}

const getSavedTeamById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));

  getById(idParam).then(team => {
    teamHTML = '';
    var teamHTML = `
          <div class="card detail">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="detail-img" src="${team.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title">${team.name}</span>
            <span>Since ${team.founded}</span>
            <table>
              <tbody>
                <tr>
                  <td>Alamat</td>
                  <td>${team.address}</td>
                </tr>
                <tr>
                  <td>No. Telp</td>
                  <td>${team.phone}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>${team.email}</td>
                </tr>
                <tr>
                  <td>Stadion</td>
                  <td>${team.venue}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-action">
            <a href="${team.website}" target="_blank">Pergi ke Website Resmi ${team.name}</a>
          </div>
        </div>
    `;
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}