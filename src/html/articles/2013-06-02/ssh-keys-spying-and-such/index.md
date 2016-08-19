---
title: "SSH keys, spying, and such"
description: "How do SSH keys work, and what do they do?"
date: 2013-06-02 19:03

---

Do you push stuff up to GitHub? Heroku? A remote repository of any kind? Chances are that you've been asked to “simply upload your SSH keys” to some site or another.

If you are anything like me, you've nothing but a vague idea what SSH keys are, you've simply googled and found a link similar to [the Github help](https://help.github.com/articles/generating-ssh-keys) pages, followed the 4 steps and everything seems to work. Huzzah! What exactly did you just do? What does SSH actually mean? It's time for an elaborate explaination.

## Excruciating Cold War analogy of SSH keys

Let's say that you need to pass a secret package of microfilm securely with another person in return for nuclear plans, but don't know what he/she looks like and don't want your package to fall into the wrong hands. How do you know who to trust?

![image](the-spy-who-came-in-from-the-cold.jpg =700x260)

You could arrange to meet at a ski resort and pass long, elaborate coded phrases between one another about favourite brands of cigarettes until both of you are convinced of the other's credentials.

At this point you could (most likely) swap microfilm baked into a ceramic cat with the nuclear plans embedded in a Kandinsky painting, and disappear into the night.

The problem with this approach is that at some other point in the past - someone will need to have arranged shared passwords. These passwords could be intercepted by unscrupulous types, and before you know it, ‘Comrade Zero’ has gone to your rendezvous point, used *your* secret phrases and stolen your nuclear plans and given your contact a microfilm full of holiday photos in what will ultimately prove to be another powerful blow against the Capitalist West.

Alternatively, both parties could have a padlock and a key. They send their padlock to their opposite number with instructions to bring it to the meeting point, with respective packages locked inside boxes.

Once they meet, all it takes is a simple check to see that each padlock can be opened by the other person's key and you're home free.

If both padlocks cannot be opened, then there is a reasonable chance that one of you is a fraud, the deal is seen as a bust and what follows is almost certainly an exhilarating car chase through Prague.

What I'm saying here is that passwords have a single point of failure; giving the opposing party the a padlock that can only be unlocked your private key reassures both sides that the other isn't a KGB operative, and can be trusted enough to deal in microfilm/nuclear-plan barter-based processes.

## But that's not really how SSH keys work

No, not really, but close enough. If you squint.

![image](spy-vs-spy.jpg =700x284)

Instead of literal private keys and public padlocks, think of public and private SSH keys. Public keys can encrypt a message, and the corresponding private key is the only one that can de-crypt it.

When you first connect to a remote machine for the first time, it will send you its public key. If you've uploaded your computer's public key to the server, it will use that to encrypt a message and send to your machine.

If your machine can decode that message correctly, that's half the job done. Next, your machine uses the remote's public keys to encrypt that message and send it back.

If the remote machine can successfully decrypt that message, both machines can be reasonably sure that other can be trusted and get on with the business of transacting.

## That was a lot of text. What do I need to _do_?

1. Create a SSH public/private key-pair.
2. Add the public key to the remote server's ‘trusted keys’ list.
3. SSH to the remote server.
4. Accept the remote server's public key.

Basically, do the same steps as outlined on [the Github help](https://help.github.com/articles/generating-ssh-keys) pages. But now you know more about what is actually going on there – great!

Next time we will be doing a lot more of the hands–on work, and should act as the one–stop reference page you actually need to get this SSH stuff done.
