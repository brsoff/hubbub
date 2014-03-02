CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => ENV['AWS_KEY_1'],                        # required
    :aws_secret_access_key  => ENV['AWS_SECRET_1']                      # required      
  }

  config.fog_directory  = ENV['AWS_BUCKET_NAME_1']                     # required
end