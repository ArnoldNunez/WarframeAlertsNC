var IndexViewModel = (function () {

    let alerts = [];
    let invasions = [];
    let syndicatesMiss = [];

    function _initialize() {
    }

    function _parseModelData(modelData) {
        // parse data
        console.log("parsing data");
        console.log(modelData);
        _clearContents();

        for (let i = 0; i < modelData.alerts.length; i++) {
            let alert = new Alert();
            alert.id = modelData.alerts[i].id;
            alert.activation = new Date(modelData.alerts[i].activation).getTime();
            alert.expiration = new Date(modelData.alerts[i].expiry).getTime();
            alert.faction = modelData.alerts[i].mission.faction;
            alert.location = modelData.alerts[i].mission.node;
            alert.levelMin = modelData.alerts[i].mission.minEnemyLevel;
            alert.levelMax = modelData.alerts[i].mission.maxEnemyLevel;
            alert.type = modelData.alerts[i].mission.type;

            let cdt = new CountDownTimer((alert.expiration - Date.now()) / 1000, 1000);
            cdt.start();
            alert.timer = cdt;

            let missionReward = new MissionReward();

            missionReward.asString = modelData.alerts[i].mission.reward.asString;
            missionReward.thumbnail = modelData.alerts[i].mission.reward.thumbnail;

            if (typeof modelData.alerts[i].mission.reward.credits !== "undefined") {
                missionReward.credits = modelData.alerts[i].mission.reward.credits;
            }

            if (typeof modelData.alerts[i].mission.reward.items !== "undefined") {
                for (let j = 0; j < modelData.alerts[i].mission.reward.items.length; j++) {
                    missionReward.items.push(modelData.alerts[i].mission.reward.items[j]);
                }
            }

            alert.reward = missionReward;
            alerts.push(alert);
        }

        console.log(alerts);
    }

    function getAlerts() {
        return alerts;
    }

    function _clearContents() {
        alerts = [];
        invasions = [];
        syndicatesMiss = [];
    }

    return {
        initialize: _initialize,
        parseModelData: _parseModelData,
        getAlerts: getAlerts
    };
})();