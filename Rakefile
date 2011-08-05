# adapted from https://github.com/mmonteleone/michaelmonteleone.net/blob/master/Rakefile

require 'packr'
require 'rake/clean'

desc 'Build site with Jekyll'
task :build => [:clean] do
  # compile site
  jekyll  
end
 
desc 'Start server with --auto'
task :server => [:clean]  do
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rtzhavz --delete _site/ root@tryingtothink.com:/var/www/matthewvince.com/public/'
end

desc 'Begin a new post'
task :post do   
  ROOT_DIR = File.dirname(__FILE__)

  title = ARGV[1]
  tags = ARGV[2 ]

  unless title
    puts %{Usage: rake post "The Post Title"["Tag 1, Tag 2"]}
    exit(-1)
  end

  datetime = Time.now.strftime('%Y-%m-%d')  # 30 minutes from now.
  slug = title.strip.downcase.gsub(/ /, '-')

  # E.g. 2006-07-16_11-41-batch-open-urls-from-clipboard.markdown
  path = "#{ROOT_DIR}/_posts/#{datetime}-#{slug}.markdown"

  header = <<-END
---
title: #{title}
tags:  [#{tags}]
layout: post
description: Description Content
comments: false
---

END

  File.open(path, 'w') {|f| f << header }
  system("mate", "-a", path)    
end  

task :default => :server

# clean deletes built copies
CLEAN.include(['_site/','assets/themes/default/js/*.min.js'])

def jekyll(opts = '')
  sh 'jekyll ' + opts
end
