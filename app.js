// アクセスした人のUser-Agentを取得する
const userAgent = window.navigator.userAgent;

// アクセスした人のIPを取得する
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;

    // アクセスした人のタイムゾーンを取得する
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // アクセスした人のホスト名を取得する
    const hostName = window.location.hostname;

    // アクセスした人のISP情報を取得する
    fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => response.json())
      .then(data => {
        const isp = data.org;

        // アクセスしたサイトのURLを取得する
        const url = window.location.href;

        // DiscordのWebhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/your-webhook-url-here';

        // アクセスした人のデバイス情報をまとめる
        const deviceInfo = {
          'User-Agent': userAgent,
          'IP': ip,
          'Timezone': timeZone,
          'Hostname': hostName,
          'ISP': isp,
          'Device': `${window.screen.width}x${window.screen.height}`,
          'URL': url,
        };

        // DiscordのWebhookにデータを送信する
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [{
              title: 'アクセス情報',
              color: 0x00ff00,
              fields: [
                { name: 'User-Agent', value: userAgent, inline: false },
                { name: 'IP', value: ip, inline: true },
                { name: 'Timezone', value: timeZone, inline: true },
                { name: 'Hostname', value: hostName, inline: false },
                { name: 'ISP', value: isp, inline: false },
                { name: 'Device', value: `${window.screen.width}x${window.screen.height}`, inline: true },
                { name: 'URL', value: url, inline: false },
              ],
              timestamp: new Date(),
            }],
          }),
        });
      });
  });
