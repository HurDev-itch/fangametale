handlers.GiveCurrencyToAll = function (args, context) {

    const amount = args.amount;
    const currency = "Oreo";

    if (!amount || amount <= 0)
        throw "Invalid amount";

    const segmentId = context.playerProfile?.SegmentId || null;

    const result = server.GetPlayersInSegment({
        SegmentId: segmentId
    });

    if (!result || !result.PlayerProfiles)
        throw "No players found";

    for (let player of result.PlayerProfiles) {
        server.AddUserVirtualCurrency({
            PlayFabId: player.PlayerId,
            VirtualCurrency: currency,
            Amount: amount
        });
    }

    return {
        success: true,
        players: result.PlayerProfiles.length
    };
};
