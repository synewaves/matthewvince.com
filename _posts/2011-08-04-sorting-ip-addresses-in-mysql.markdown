---
title: Sorting IP Addresses in MySQL
tags:  [mysql, tech]
layout: post
---

## So you want to store IPv4 addresses in MySQL?

That's great! So you reach for the obvious: `varchar(15)`. This works pretty well for most web use cases (ex: event logging). The problem comes if you want to accurately sort the IP addresses. Let's say we have the following records:

{% highlight sql %}
| ip_address   |
+--------------+
| 192.168.1.2  |
| 192.168.1.1  |
| 192.168.1.13 |
| 192.168.1.3  |
| 192.168.1.22 |
{% endhighlight %}

And we run the following statement and notice what happens:

{% highlight sql %}
SELECT * FROM ip_addresses ORDER BY ip_address;

| ip_address   |
+--------------+
| 192.168.1.1  |
| 192.168.1.13 |
| 192.168.1.2  |
| 192.168.1.22 |
| 192.168.1.3  |
{% endhighlight %}

That's not really what we wanted, but why?  MySQL is doing a standard string compare to order the results. We need to sort on the numeric representation, but how? We could write some complicated conversion function, but there's something much more helpful found in the [MySQL manual: INET_ATON](http://dev.mysql.com/doc/refman/5.0/en/miscellaneous-functions.html#function_inet-aton).

> Given the dotted-quad representation of an IPv4 network address as a string, returns an integer that represents the numeric value of the address in network byte order (big endian).
	
This is exactly what we need. Using this function in an `ORDER BY` clause will sort our IPv4 in perfect numerical order:

{% highlight sql %}
SELECT * FROM ip_addresses ORDER BY INET_ATON(ip_address);

| ip_address   |
+--------------+
| 192.168.1.1  |
| 192.168.1.2  |
| 192.168.1.3  |
| 192.168.1.13 |
| 192.168.1.22 |
{% endhighlight %}

I needed this for a particular Rails app I was developing.  I hope it comes in handy for you as well.