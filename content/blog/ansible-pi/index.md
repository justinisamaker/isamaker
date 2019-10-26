---
layout: post
title:  "Headless Raspberry Pi Startup with Ansible"
niceDate: "March 14th, 2017"
teaser: "Get your Pi up and ready to go with a few short commands and an Ansible playbook."
category: blog-post
tags: [raspberrypi, pi, hardware, ansible, devops]
featuredImage: ansible-pi.jpg
---

Getting started on a Raspberry Pi can be a little daunting if you're brand new to working with the board. The easiest route is to get a monitor and a spare mouse and keyboard to get everything set up, but there are plenty of times when you aren't going to have access to all of those components. If you're sitting there with a Pi and wondering how to get set up, this post will help you get the ball rolling. This kind of setup refers to running the Pi "headless", which is just a fancy way to say running it without a monitor.

We'll walk through the basic steps to get SSH set up, and then we'll move on to the fun stuff - configuring your Pi via Ansible.

{% include imageWithCaption.html size="large" imageSrc="/assets/img/ansiblePi/ansible-pi.jpg" caption="Raspberry Pi & Ansible" %}

### Getting your Pi ready

Let's start by discussing how to get the Raspbian image on the SD card. We'll be using the Raspbian Jessie with Pixel distro for this project. Head over to <a href="https://www.raspberrypi.org/downloads/noobs/" target="_new">raspberrypi.org</a> to grab the latest Raspbian download. At the time of this post, the latest version is 4.4, but this should work for pretty much any version. If you can download torrents on your network, the torrent option for downloading the Raspbian distro is trusted and significantly faster than downloading the ZIP file.

I'll be using a Mac for this tutorial, and a few of the tools we'll use to make this work are only available for Mac, to my knowledge. While you're waiting for Raspbian to download, head over and download two additional programs that we'll need to flash the card. The first is <a href="https://www.sdcard.org/downloads/formatter_4/" target="_blank">SD Card Formatter</a> from the SD Association. We'll use this to prep our card for imaging. The second is <a href="https://www.tweaking4all.com/software/macosx-software/macosx-apple-pi-baker/" target="_new">Apple Pi Baker</a>, a tool that makes managing your Pi disk images as easy as...pi. Sorry.

Let's format our SD card first. Open SD Formatter and choose the "Quick Format" option. Make sure you have the right card selected - unless you have any other external media plugged in, the only option should be the micro SD that you'll use for your Pi. Click format and you should be good to go.

When your Raspbian download has finished, you need to unzip it get access to the .img file. If you double-click the file and use Mac's native Archive Utility, the ZIP file will unpack to a .cpgz file, which we don't want. Instead of using Archive Utility, you need to use something like <a href="http://unarchiver.c3.cx/unarchiver" target="_new">The Unarchiver</a> to extract the .img file from the ZIP. Once you have the .img file, we're ready to make a few edits to the image that will help us with our setup.

Double-click the Raspbian .img file to boot the drive. We'll get into this new drive to edit and create a few files. When you see the booted drive on your Mac (likely called boot), open a new terminal window. We need to tell the terminal what we'd like to edit, and the easiest way to do this is to type "`cd`" for "change directory", and then drag the boot disk onto the terminal window - this will autofill the path for us. Hit enter to change the directory, and then type "`ls -a`" to show all the files in the directory.

### Enabling SSH on the boot disk

Due to a security problem a few months back, <a href="https://www.raspberrypi.org/blog/a-security-update-for-raspbian-pixel/" target="_new">the Raspberry Pi Foundation made the decision to not enable SSH by default on new Raspbian images</a>. This is an incredibly smart move as you don't want SSH enabled with the default username and password - people who don't change it were leaving their Pi's open to a world of hurt. We're going to re-enable it with the knowledge that we'll be changing our password from the default as soon as we boot up. To enable SSH, you'll need to create a blank file in the boot disk called "SSH". To do this, run "`sudo touch ssh`" in your terminal window that's pointed at the boot disk.

### Configuring wi-fi on the boot disk
SSH isn't much good to us without a network connection. To make sure that we're able to connect to wi-fi, we need to add a wpa_supplicant.conf file to our boot disk. Run "`sudo nano wpa_supplicant.conf`" in your terminal. This will open a nano editor that will let you write code in the terminal. For our power users out there, feel free to use whatever editor you'd like (looking at you, Vim/Emacs folks). We need to add the following code to this file to connect to a network. You'll need to replace the "YOUR_NETWORK_NAME" and "YOUR_NETWORK_PASSWORD" with the appropriate credentials for your network. Once you're done editing the file in nano, hit "ctrl+x" to exit, and then "Y" to save.

{% highlight bash %}
network={
  ssid="YOUR_NETWORK_NAME"
  psk="YOUR_NETWORK_PASSWORD"
  key_mgmt=WPA-PSK
}
{% endhighlight %}

### Writing the image
We've got our two pieces of the book disk that needed editing ready, so now we can move on to actually writing the image to the card.

You can start by ejecting the "boot" disk image - we won't need that anymore. Next, open Pi Baker and select the SD card that you just formatted. We're going to use the "restore backup" function to write the .img file to the card. Locate the raspbian-jessie.img file that you downloaded, and select it in the "restore backup" section of Pi Baker. After you have the selected, click "Restore Backup". This process took around eight minutes to complete, but your mileage will vary based on your computer and the size of your SD card.

### Firing up your Pi
Now that the card is ready to go with the Raspbian image, we can go ahead and power it on! Plug your Pi in, then open a new terminal window on your Mac. We'll try one command to SSH in first, and we'll have a backup for anyone who that doesn't work for. Depending on your network, you may be able to address the Pi as "raspberrypi.local". To give this a shot, type "`ssh raspberrypi.local -l pi`" into your terminal and hit enter. If it asks you about wanting to add the fingerprint, congrats, it worked - type "yes" and then hit enter to accept. After that, enter the default password of "raspberry". If you get something along the lines of "Could not resolve hostname raspberrypi.local", that probably means that your network isn't going to let us address the Pi with the shortname, provided you got the rest of the steps right. We have a few options to figure out the IP address of the Pi so we can SSH in, the easiest of which is accessing the network router for your wi-fi. Log in to your router's control panel, look for connected devices, and make a note of the IP address associated with the hostname "raspberry". If you don't have access to your router, you can follow <a href="https://www.raspberrypi.org/documentation/remote-access/ip-address.md" target="_new">these instructions from raspberrypi.org</a> to find your IP using other methods. Once you have your Pi's IP address, type "`ssh YOUR_PI_IP_ADDRESS -l pi`" and follow the previous instruction to log in with the default credentials.

### Changing your password
The absolute first thing that we need to do is change the default password. The easiest way to change the password is through "raspi-config", which you can access by typing "`sudo raspi-config`" in your SSH terminal. Hit enter to select "Change User Password", then enter your password. Back at the raspi-config window, hit tab twice to select "Finish", then hit enter. The username "pi" is now associated with whatever password you just set.

### On to Ansible
Ansible is an automation tool that lets us easily script a series of actions that we'd like to take place on our Pi. It's big in the devops world, and it's easy to see why - Ansible is relatively easy to get up and running compared to its alternatives. Its ease-of-use makes it a perfect candidate to set up a Pi.

I created an Ansible Playbook to group all of our actions - you can <a href="https://github.com/justinisamaker/ansible-pi" target="_new">clone it from my Github.</a> A playbook, in Ansible parlance, is just a collection of actions and the things that they need in order to run. Start by cloning the repo to your main computer. Once you have the repo cloned, open up the "hosts" file in your code editor. You'll need to replace the "YOUR_PI_IP_HERE" and "ansible_user"/"ansible_password" sections with, you guessed it, your Pi's IP and your username and password. If you forgot your IP from earlier, or if you didn't have to get it because "raspberrypi.local" worked, you can just type "`ifconfig`" in your SSH window and find the IP address listed under WLAN0 if you're connected to the wifi. Enter your Pi's IP and login information in the hosts file, then save.

### Breaking down the Ansible tasks
The actions that we'll be taking on our Pi are all located in the "`/roles/common/files`" section of the Ansible-Pi repo you just cloned. These are fairly opinionated to what I use the Pi for, but the beauty of open source is that they're all editable, so you can adjust them to your liking. Let's walk through what each .sh file does:
- anti-raspbian-bloat: Removes packages that I don't want on every installation, removes unused folders in /home/pi
- configure-locale: Changes the locale from en_GB to en_US
- set-keyboard-layout: Changes the keyboard layout from GB to US
- set-timezone: Sets the timezone to "America/Chicago"

You can edit any of these files to better reflect your locale. If you're comfortable with using English for the Pi and you're located in the United States, all you should have to update is the timezone file.

The next piece that we'll look at is the actual list of tasks, which you can find in "`/roles/commons/tasks/main.yml`". Let's break that routine down:
- Transfer init scripts: Moves everything from "`/roles/common/files`" into your Pi
- Thin out Raspbian: Deletes unnecessary files/directories
- Upgrade apt cache: Makes sure we have the latest packages
- Upgrade dist: Step two of making sure our packages are up-to-date
- Configure locale
- Set timezone
- Set keyboard layout
- Install packages: Use this to install any packages you want to that you would usuall install with "`apt-get-install`". Right now I just have it set up to install TightVNC.
- Reboot: restart the Pi to make sure our changes are applied

Before we run this, you'll need to install Ansible on your Mac. You can do this through <a href="https://brew.sh/" target="_new">Homebrew</a> by running "`brew install ansible`".

Now we're on to the good stuff - actually running our playbook! On your Mac's terminal, navigate to the folder that you cloned ansible-pi to, then run "`ansible-playbook -s -i hosts ansible-pi.yml`". This tells Ansible to run our root playbook with sudo access using the hosts file from the repo. You should see the task names start to read out to your terminal. For a brand new Pi, each task should say the task name, and then a status message that should read "changed: YOUR_PI_IP_ADDRESS". The only task that should fail is the final reboot task - the Pi will already be rebooting, so it can't report back that the task finished successfully.

### Making sure it worked
After you've run the ansible playbook, SSH back into your Pi. If you type "`ls`" in the home directory, you should only see the init folder that we transferred over. That means that your configuration worked, and you should be good to start using your Pi!
