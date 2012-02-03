require 'cgi'
require 'httparty'
require 'active_support/core_ext/hash/slice'

module ImdbData
  extend self
  
  include HTTParty
  base_uri "http://www.imdbapi.com/"
  format :json
  
  FIELDS_TO_RETURN = ["Rated", "Released", "Director", "Writer", "Actors", "Poster", "Runtime", "Plot"]
  
  def fetch(title, year = "")
    response = get("?t=#{CGI.escape(title.to_s)}&y=#{CGI.escape(year.to_s)}&tomatoes=false")
    process_response(response.parsed_response)
  end
  
  private
  
  def process_response(hash)
    new_hash = {}
    hash.slice(*FIELDS_TO_RETURN).each_pair do |key, value|
      new_hash[key.downcase.gsub(' ', '_')] = value
    end
    new_hash
  end
  
end
