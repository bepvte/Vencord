/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "ServerListAPI",
    authors: [Devs.kemo],
    description: "Api required for plugins that modify the server list",
    patches: [
        {
            find: "Messages.DISCODO_DISABLED",
            replacement: {
                match: /(?<=Messages\.DISCODO_DISABLED.+?return)(\(.{0,75}?tutorialContainer.+?}\))(?=}function)/,
                replace:
                    "[$1].concat(Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.Above))",
            },
        },
        {
            find: "Messages.SERVERS,children",
            replacement: [
                {
                    match: /(?<=Messages\.SERVERS,children:)\i\.map\(\i\)/,
                    replace:
                        "Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.In).concat($&)",
                },
                {
                    match: /guildDiscoveryRef.{0,300}\{\}\)\]\}\)\]/,
                    replace:
                        "$&.concat(Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.Below))",
                },
            ],
        },
    ],
});
