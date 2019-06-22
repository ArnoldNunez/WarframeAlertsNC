var IndexView = (function () {
    let $alerts;
    let $invasions;
    let $syndicateMiss;

    let $alertsNavBtn;
    let $invasionsNavBtn;
    let $syndicateMissNavBtn;

    let currentListing = "ALERTS";

    function initialize(alSel, invSel, syndSel) {
        $alerts = $(alSel);
        $invasions = $(invSel);
        $syndicateMiss = $(syndSel);
    }

    function registerViewEvents() {
        $alertsNavBtn.on('click', alertsBtn_Click(event));
        $invasionsNavBtn.on('click', invasionsBtn_Click(event));
        $syndicateMissNavBtn.on('click', syndicateMissBtn_Click(event));
    }

    function populateListView(viewModel) {
        console.log("rendering data");

        renderAlerts(viewModel.getAlerts());
    }

    function alertsBtn_Click(event) {
        console.log("alerts button clicked");
    }

    function invasionsBtn_Click(event) {
        console.log("invasions button clicked");
    }

    function syndicateMissBtn_Click(event) {
        console.log("syndicate mission button clicked");
    }


    function renderAlerts(alerts) {
        let html = "<ul>";
        let alertId = null;
        let locText = "";
        let missTypeText = "";
        let factText = "";
        let rewardtext = "";
        let rewardImgSrc = "";
        let alertLvlMin = "";
        let alertLvlMax = "";

        for (let i = 0; i < alerts.length; i++) {
            alertId = alerts[i].id;
            locText = alerts[i].location;
            missTypeText = alerts[i].type;
            factText = alerts[i].faction;
            rewardtext = alerts[i].reward.asString;
            rewardImgSrc = alerts[i].reward.thumbnail;
            alertLvlMin = alerts[i].levelMin;
            alertLvlMax = alerts[i].levelMax;

            html +=
                `<li>
    <div id="alert_${alertId}" class="alert">
        <img src="${rewardImgSrc}" width="126px" height="96px" />
        <div class="float-right">
            <p><h3><strong>${locText}</strong> Level ${alertLvlMin}-${alertLvlMax}</h3></p>
            <p><h3>${missTypeText} - ${factText}</h3></p>
            <p>Reward: ${rewardtext}</p>
            <span class="timer"></span>
        </div>
    </div>
</li>`;
            // Set up the alert timer
            alerts[i].timer.onTick(function (days, hours, minutes, seconds) {
                let timerStr = "";

                if (days !== "" && days !== null) {
                    timerStr += days + ":";
                }

                timerStr += hours + ":" + minutes + ":" + seconds;

                if (days + hours + minutes + seconds < 1) {
                    $("#alert_" + alerts[i].id + " .timer").text("Expired");
                } else {
                    $("#alert_" + alerts[i].id + " .timer").text(timerStr);
                }
            });
        }

        html += "</ul>";

        $alerts.html(html);
    }

    function renderInvasions(invasions) {

    }

    function renderSyndicates(syndMiss) {

    }


    return {
        initialize: initialize,
        populateListView: populateListView
    };
})();