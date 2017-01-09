namespace :production do
  desc 'Run Webpack'
  task :assets do
    sh 'cd dev && npm run production' do |ok, res|
      fail 'Error running `npm run production`' unless ok
    end
  end

  desc 'Install dependencies'
  task :install do
    sh 'cd dev && npm install' do |ok, res|
      fail 'Error running `npm install`' unless ok
    end
  end
end