class Doc
  class << self
    def parse(string)
      JSON.parse(string, symbolize_names: true)
    end

    def dump(hash)
      JSON.dump(hash)
    end
  end
end
