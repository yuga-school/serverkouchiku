import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded-md bg-gray-800 p-2 transition-colors hover:bg-gray-700"
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );
};


interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ children, className = '' }) => (
  <div className={`rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const CenteredContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  </div>
);

interface CommandProps {
  command: string;
}

const Command: React.FC<CommandProps> = ({ command }) => (
  <div className="relative flex items-center space-x-3 bg-gray-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
    <code className="text-green-400 select-none">$</code>
    <code className="pr-12">{command}</code>
    <CopyButton text={command} />
  </div>
);

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 transition-colors duration-200 ${
      isActive 
        ? 'bg-blue-500 text-white shadow-md' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    } rounded-t-lg font-medium`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface Step {
  type: 'command' | 'info';
  content: string;
  image?: string;
  code?: string;
}

interface Context {
  type: 'info';
  image?: string;
  content: string;
}

interface ContentItem {
  title: string;
  contexts: Context[];
  steps: Step[];
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

const SetupGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('prerequisites');

  const sections: Section[] = [
    {
      id: 'prerequisites',
      title: '準備',
      content: [
        {
          title: 'ブート可能なUSBの作成',
          contexts: [
            {
              type: 'info',
              content: 'https://www.ubuntulinux.jp/download/ja-remixにアクセスして、Ubuntuの日本語版をダウンロードする。',
            },
            {
              type: 'info',
              content: 'https://rufus.ie/ja/にアクセスして、rufus-4.5p.exeをダウンロードする。',
            },
            {
              type: 'info',
              content: 'rufus-4.5p.exeを起動して、usbを選択する。',
            },
            {
              type: 'info',
              image: '../public/assets/01.png',
              content: 'ブートの種類を、ubuntu-ja-22.04-desktop-amd64.isoにして選択し、スタートを実行する。',
            },
            {
              type: 'info',
              content: 'ISOHybrid　イメージの検出でISOイメージモードで書き込むを選択してOKを押す。',
            },
            {
              type: 'info',
              content: 'usbをフォーマットするかの確認があるので、はいを選択する。',
            },
          ],
          steps: [
          ]
        },
        {
          title: 'Ubuntuのインストール',
          contexts: [
            {
              type: 'info',
              image: '../public/assets/02.JPG',
              content: '配布されたノートでBIOSを開き、Boot priorityでusbを一番上において、セーブする。',
            },
            {
              type: 'info',
              content: 'AdvancedModeに移動して、SecurityからSecure boot controlを無効にする。',
            },
            {
              type: 'info',
              content: 'PCを起動して、ubuntuを立ち上げる。',
            },
            {
              type: 'info',
              image: '../public/assets/03.JPG',
              content: '「ubuntuをインストール」を選択する。',
            },
            {
              type: 'info',
              image: '../public/assets/04.JPG',
              content: 'キーボードレイアウトはJapaneseに設定する。',
            },
            {
              type: 'info',
              image: '../public/assets/05.JPG',
              content: 'アップデートと他のソフトウェアは「通常のインストール」、その他のオプションは「グラフィックスとwi-fiハードウェアと追加のメディアフォーマットのサードパーティ製ソフトウェアをインストールする」を選択する。',
            },
            {
              type: 'info',
              image: '../public/assets/06.JPG',
              content: 'インストールの種類は「ディスクを削除してUbuntuをインストール」を選択する。',
            },
            {
              type: 'info',
              image: '../public/assets/07.JPG',
              content: '自分の住んでいる国を選択する。',
            },
            {
              type: 'info',
              image: '../public/assets/08.JPG',
              content: '自分の情報を入力する。',
            },
            {
              type: 'info',
              content: 'wifiに接続する。',
            },
          ],
          steps: [
          ]
        },
      ]
    },
    {
      id: 'apache',
      title: 'Apache設定',
      content: [
        {
          title: 'Apacheのインストールと起動',
          contexts: [
            {
              type: 'info',
              content: '端末で以下のコマンドを順番に実行する。',
            }
          ],
          steps: [
            {
              type: 'command',
              content: 'sudo apt -y install apache2'
            },
            {
              type: 'info',
              content: 'を実行して Apache HTTP Serverのインストールを行う。'
            },
            {
              type: 'command',
              content: 'sudo systemctl start apache2'
            },
            {
              type: 'info',
              content: 'を実行して Apacheの起動を行う。'
            },
            {
              type: 'info',
              content: 'firefoxでhttp://localhostに接続すると以下のページが表示されるかを確認する。'
            },
            {
              type: 'command',
              image: '../public/assets/09.JPG',
              content: 'sudo systemctl enable apache2'
            },
            {
              type: 'info',
              content: 'を実行して Apacheの自動起動の有効化を行う。'
            },
            {
              type: 'command',
              content: 'sudo systemctl status apache2'
            },
            {
              type: 'info',
              content: 'を実行して Apacheのステータスを表示する。'
            },
          ]
        },
        {
          title: '仮想ホストの設定',
          contexts: [
            {
              type: 'info',
              content: 'Apache設定ディレクトリに移動して設定ファイルを作成する。',
            }
          ],
          steps: [
            {
              type: 'command',
              content: 'sudo touch /etc/apache2/sites-available/setting.conf'
            },
            {
              type: 'info',
              content: ' を実行して、setting.confファイルを作成する。'
            },
            {
              type: 'command',
              content: 'sudo vi /etc/apache2/sites-available/setting.conf'
            },
            {
              type: 'info',
              content: 'を実行して以下の内容を入力する。',
              code: `<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html2
    DirectoryIndex test
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>`
            },
            {
              type: 'command',
              content: 'cd ../../../'
            },
            {
              type: 'info',
              content: 'を実行してvarディレクトリの親ディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'cd var/www/'
            },
            {
              type: 'info',
              content: 'を実行してwwwディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'sudo mkdir -p html2'
            },
            {
              type: 'info',
              content: 'を実行してhtml2フォルダを作成する。'
            },
            {
              type: 'command',
              content: 'cd html2'
            },
            {
              type: 'info',
              content: 'を実行してhtml2フォルダに移動する。'
            },
            {
              type: 'command',
              content: 'sudo touch test.html'
            },
            {
              type: 'info',
              content: 'を実行してtestファイルを作成する。'
            },
            {
              type: 'command',
              content: 'sudo vi test.html'
            },
            {
              type: 'info',
              content: 'を実行してtestファイルを編集して、htmlのコードを書く。'
            },
            {
              type: 'command',
              content: 'sudo a2ensite setting.conf'
            },
            {
              type: 'info',
              content: 'を実行して仮想ホストの有効化を行う。'
            },
            {
              type: 'command',
              content: 'sudo systemctl reload apache2'
            },
            {
              type: 'info',
              content: 'を実行して有効化した仮想ホストをサーバーに反映する。'
            },
            {
              type: 'command',
              content: 'sudo a2dissite 000-default.conf'
            },
            {
              type: 'info',
              content: 'を実行して仮想ホストの無効化を行う。'
            },
            {
              type: 'command',
              content: 'sudo systemctl reload apache2'
            },
            {
              type: 'info',
              content: 'を実行して有効化した仮想ホストをサーバに反映を行う。'
            },
            {
              type: 'command',
              content: 'sudo ufw enable'
            },
            {
              type: 'info',
              content: 'を実行してファイアウォールの有効化を行う。'
            },
            {
              type: 'command',
              content: 'sudo ufw allow ‘Apache’'
            },
            {
              type: 'command',
              content: 'sudo ufw allow 80/tcp'
            },
            {
              type: 'info',
              content: 'を実行して 80番ポートの開放を行う。'
            },
            {
              type: 'command',
              content: 'sudo apt install apache2-utils'
            },
            {
              type: 'info',
              content: 'を実行して apache2-utils をインストールする。'
            },
            {
              type: 'command',
              content: 'sudo htpasswd -c /etc/apache2/.htpasswd icnpc-01'
            },
            {
              type: 'info',
              content: 'を実行してユーザー名がicnpc-01のユーザーを登録する。'
            },
            {
              type: 'command',
              content: '$sudo vi /etc/apache2/sites-available/setting.conf'
            },
            {
              type: 'info',
              content: 'を実行して<VirtualHost *:80> 内に以下の内容を入力する。',
              code: `<Directory "/var/www/html2">
  AuthType Basic
  AuthName "Restricted Content"
  AuthUserFile /etc/apache2/.htpasswd
  Require valid-user
</Directory>`
            },
            {
              type: 'command',
              content: 'sudo systemctl reload apache2'
            },
            {
              type: 'info',
              content: 'を実行して Apacheを再起動する。'
            },
          ]
        }
      ]
    },
    {
      id: 'ssh',
      title: 'ssh接続',
      content: [
        {
          title: 'sshの設定',
          contexts: [
          ],
          steps: [
            {
              type: 'command',
              content: 'sudo apt install openssh-server'
            },
            {
              type: 'info',
              content: 'を実行して OpenSSHをインストールする。',
            },
            {
              type: 'command',
              content: 'cd ../../'
            },
            {
              type: 'info',
              content: 'を実行して etcの親ディレクトリに移動する。',
            },
            {
              type: 'command',
              content: 'sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config_backup'
            },
            {
              type: 'info',
              content: 'を実行して設定ファイルのバックアップを作成する。',
            },
            {
              type: 'command',
              content: 'cd etc'
            },
            {
              type: 'info',
              content: 'を実行してetcディレクトリに移動する。',
            },
            {
              type: 'command',
              content: 'cd ssh'
            },
            {
              type: 'info',
              content: 'を実行してsshディレクトリに移動する。',
            },
            {
              type: 'command',
              content: 'sudo vi sshd_config'
            },
            {
              type: 'info',
              content: 'を実行してsshd_configを編集する。',
            },
            {
              type: 'info',
              content: '#Port22のコメントアウトを削除して、任意のポート番号に変更して保存する。',
            },
            {
              type: 'command',
              content: 'sudo ufw allow 23/tcp'
            },
            {
              type: 'info',
              content: 'を実行してsshの23番ポートの利用許可のルールを追加する。',
            },
            {
              type: 'command',
              content: 'sudo vi sshd_config'
            },
            {
              type: 'info',
              content: 'を実行してsshd_configを編集する。',
            },
            {
              type: 'info',
              content: '',
              code: `PermitRootLogin no`,
            },
            {
              type: 'info',
              content: 'を記述する。',
            },
            {
              type: 'info',
              content: '別のpcでpowershellを開く。',
            },
            {
              type: 'command',
              content: 'ssh icnpc-01@IPアドレス -p 2231'
            },
            {
              type: 'info',
              content: 'を実行してパスワードとしてicnpc-01を入力する。',
            },
          ]
        },
        {
          title: '公開鍵の生成',
          contexts: [
            {
              type: 'info',
              content: '別のpcでpowershellを開き、',
            }
          ],
          steps: [
            {
              type: 'command',
              content: 'shh-keygen -t ed25519 -f ./.ssh/id_ed25520'
            },
            {
              type: 'info',
              content: 'を実行して公開鍵を生成する。'
            },
            {
              type: 'command',
              content: 'cat $HOME/.ssh/id_ed25520.pub | ssh icnpc-01@IPアドレス -p 2231 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >>~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"'
            },
            {
              type: 'info',
              content: 'を実行して公開鍵の登録をする。'
            },
            {
              type: 'command',
              content: 'ssh icnpc-01@IPアドレス -p 2231'
            },
            {
              type: 'info',
              content: 'を実行してssh接続を行う。'
            },
            {
              type: 'command',
              content: 'cd ../../'
            },
            {
              type: 'info',
              content: 'を実行してetcディレクトリの親ディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'cd etc'
            },
            {
              type: 'info',
              content: 'を実行してetcディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'cd ssh'
            },
            {
              type: 'info',
              content: 'を実行してsshディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'sudo vi sshd_config'
            },
            {
              type: 'info',
              content: 'を実行してsshd_configファイルを編集して',
              code: 'AuthenticationMethods publickey,password'
            },
            {
              type: 'info',
              content: 'を追加する。'
            },
            {
              type: 'command',
              content: 'ssh 別のアカウント@IPアドレス -p 2231'
            },
            {
              type: 'info',
              content: 'を実行して実際にアクセスが拒否されるかを確認する。'
            },
          ]
        }
      ]
    },
    {
      id: 'Docker',
      title: 'Dockerの利用',
      content: [
        {
          title: 'Dockerのインストール',
          contexts: [
          ],
          steps: [
            {
              type: 'command',
              content: 'sudo apt-get update'
            },
            {
              type: 'info',
              content: 'を実行してパッケージリストの更新を行う。',
            },
            {
              type: 'command',
              content: 'sudo apt-get install ca-certificates curl'
            },
            {
              type: 'info',
              content: 'を実行して、リポジトリのHTTPS接続に必要となるパッケージをインストールする。',
            },
            {
              type: 'command',
              content: 'sudo install -m 0755 -d /etc/apt/keyrings'
            },
            {
              type: 'command',
              content: 'sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o/etc/apt/keyrings/docker.asc'
            },
            {
              type: 'command',
              content: 'sudo chmod a+r /etc/apt/keyrings/docker.asc'
            },
            {
              type: 'info',
              content: 'を実行して、Docker GPGキーを追加する。',
            },
            {
              type: 'command',
              content: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu'
            },
            {
              type: 'command',
              content: '(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee/etc/apt/sources.list.d/docker.list > /dev/null'
            },
            {
              type: 'command',
              content: 'sudo apt-get update'
            },
            {
              type: 'info',
              content: 'を実行して、Aptソースへのリポジトリの追加を行う。',
            },
            {
              type: 'command',
              content: 'sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin'
            },
            {
              type: 'info',
              content: 'を実行して、Dockerパッケージの最新バージョンをインストールする。',
            },
          ]
        },
        {
          title: 'HelloWorldコンテナの起動',
          contexts: [
          ],
          steps: [
            {
              type: 'command',
              content: 'docker container run hello-world'
            },
            {
              type: 'info',
              content: 'を実行してHelloWorldコンテナを起動する。'
            },
            {
              type: 'command',
              content: 'docker container ls -all'
            },
            {
              type: 'info',
              content: 'を実行してコンテナ一覧を確認できる。'
            },
            {
              type: 'command',
              content: 'docker container stop コンテナID'
            },
            {
              type: 'info',
              content: 'を実行してIDで指定したコンテナを停止する。'
            },
            {
              type: 'command',
              content: 'docker container rm コンテナID'
            },
            {
              type: 'info',
              content: 'を実行してIDで指定したコンテナを削除する。'
            },
            {
              type: 'command',
              content: 'mkdir -p ~/ディレクトリ名/htdocs ~/ディレクトリ名/conf'
            },
            {
              type: 'info',
              content: 'を実行してディレクトリ名に設定したディレクトリを作成する。'
            },
            {
              type: 'command',
              content: 'cd ~/ディレクトリ名'
            },
            {
              type: 'info',
              content: 'を実行してディレクトリ名に設定したディレクトリに移動する。'
            },
            {
              type: 'command',
              content: 'sudo touch index.html'
            },
            {
              type: 'info',
              content: 'を実行してhtmlファイルを作成する。'
            },
            {
              type: 'command',
              content: 'sudo vi index.html'
            },
            {
              type: 'info',
              content: 'を実行してhtmlファイルに編集を行う。'
            },
            {
              type: 'command',
              content: 'docker run -dit --name my-apache-app -p 8080:80 -v ./htdocs:/usr/local/apache2/htdocs/ -v ./conf:/usr/apache2/conf httpd:2.4'
            },
            {
              type: 'info',
              content: 'httpdコンテナを起動する。'
            },
            {
              type: 'info',
              content: 'http://localhost:8080に移動すると作成したindex.htmlファイルが表示される。'
            },
          ]
        }
      ]
    }
  ];

  return (
    <CenteredContainer>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-3 text-center">Ubuntuサーバー構築ガイド</h1>
            <p className="text-gray-600 text-center text-lg">Version: Ubuntu 22.04 LTS</p>
            
            <Alert className="mt-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-blue-800">
                このガイドでは、<code className="bg-blue-100 px-2 py-1 rounded text-blue-900">$</code> で始まる行はターミナルでのコマンド入力を示します。
              </p>
            </Alert>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex justify-center space-x-2 p-4">
              {sections.map(section => (
                <Tab
                  key={section.id}
                  isActive={activeTab === section.id}
                  onClick={() => setActiveTab(section.id)}
                >
                  {section.title}
                </Tab>
              ))}
            </div>
          </div>

          <div className="p-6">
            {sections.map(section => (
              section.id === activeTab && (
                <div key={section.id} className="space-y-8">
                  {section.content.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <div className="space-y-4">
                        {item.contexts.map((context, contextIndex) => (
                          <div key={contextIndex}>
                            <img src={context.image}/>
                            <p>{context.content}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {item.steps.map((step, stepIndex) => (
                          <div key={stepIndex}>
                            <img src={step.image}/>
                            {step.type === 'command' ? (
                              <Command command={step.content} />
                            ) : (
                              <>
                                <p className="text-gray-700 mb-2">{step.content}</p>
                                {step.code && (
                                  <pre className="relative flex items-center space-x-3 bg-gray-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                                    <code className="pr-12">{step.code}</code>
                                    <CopyButton text={step.code} />
                                  </pre>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>

        <Alert className="bg-yellow-50 border-l-4 border-yellow-500">
          <div>
            <div className="mb-3 text-yellow-800">
              Apache設定エラーが発生した場合は、以下のコマンドでログを確認してください：
            </div>
            <Command command="systemctl status apache2.service" />
          </div>
        </Alert>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-3">参考資料：</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a href="https://yumeno.me/ubuntu-install" className="text-blue-600 hover:underline">
                Ubuntuの初期設定
              </a>
            </li>
            <li>
              <a href="https://qiita.com/Ryo-0131/items/0046d9816f430d2c2a0a" className="text-blue-600 hover:underline">
                Apache2サービス失敗時の対処方法
              </a>
            </li>
          </ul>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default function CenteredSetupGuide() {
  return <SetupGuide />;
}