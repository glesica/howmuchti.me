(function() {
    var params = JSON.parse(atob(location.hash.slice(1)) || '{}');
    if (params.ten !== undefined) {
        params.ten = new Date(params.ten);
    }
    if (params.zero !== undefined) {
        params.zero = new Date(params.zero);
    }
    countdown.blocks('#visual', params).run();
})();
