---
title: "Generating, Adding, and Using Multiple SSH keys"
description: "Creating multiple SSH keys for fun and profit"
date: 2013-06-04 19:54

---

Having “One Key to Rule Them All” can be a little concerning when it comes to SSH keys. Single points of failure are not amazing. Let's spread the risk a little.

If you find that you need to work with multiple servers (quite likely), multiple Heroku accounts (very likely) or the myriad other services that require a SSH key to get started - Github, BitBucket et al (very, very likely). No-one enjoys having a single point of failure, and going on past experience, it is incredibly annoying having all your services suddenly fail on you if your private key corrupts, mysteriously vanishes or is somehow compromised.

## Creating SSH keys

From your command line, navigate to the directory that stores your SSH keys

```bash
$ cd ~/.ssh
```

Run the key generation command:

```bash
$ ssh-keygen
```

This will return the following:

```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/buzz.lightyear/.ssh/id_rsa):
```

Here you would enter the location and name of the key you wish to save - for example `foo/new.key.for.github`. As the prompt says, leaving this blank generates the standard key `id_rsa`.

```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Enter your secret passphrase, and you're done.

```bash
The key fingerprint is:
e8:bf:af:71:b4:b3:32:3a:45:5a:c5:a6:53:d4:74:13 buzz.lightyear@Infinity.local
The key's randomart image is:
+--[ RSA 2048]----+
|         +ooE..  |
|        . + .o   |
|       o +       |
|      +.+        |
|      S.S.       |
|     . ...       |
|      o.*        |
|      .* +       |
|      o+=.       |
+-----------------+
```

With regard to passphrases, the temptation might be to leave this blank. Try not to do this; it's the equivalent of locking your car and then hiding the keys under the back wheels. All it would take is for someone to access your computer and they've also access to your remote business.

# Adding to the key manager


If you are frequently accessing a server and, frankly, the constant requests for your passphrase are becoming a little draining, then you might consider adding your key to the SSH agent.

The SSH agent takes care of the authentication for you so that you don't have to type in passwords at the terminal. Obviously, the tradeoff for convenience is the drop in security - anyone with access to your personal machine could gain access to your servers that use this particular key - the choice is yours.

With the default SSH key (`id_rsa`) this is as simple as typing in `ssh-add` into your command line, but you've got so many more keys now - so add an extra parameter as follows:

```bash
$ ssh-add foo/new.key.for.github
```

It should ask for your passphrase if you provided one, and will reward you with your equivalent of this message:

```bash
Identity added: /Users/buzz.lightyear/.ssh/andys-house (/Users/buzz.lightyear/.ssh/andys-house)
```

SSH-Agent will securely save your passphrase so that you don't need to type it in each and every time for this session. I find that on closing my terminal, I'm required to repeat this process the next time - which is a good compromise for me.

For the fully automated approach, you could tie your ssh-keys into your OSX keychain, the [Github.com help docs](https://help.github.com/articles/working-with-ssh-key-passphrases) are pretty useful for getting started.

# Further reading:

* [wiki.archlinux.org](https://wiki.archlinux.org/index.php/SSH_Keys)
* [Managing multiple SSH keys](http://www.robotgoblin.co.uk/blog/2012/07/24/managing-multiple-ssh-keys/)
