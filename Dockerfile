FROM postgres:12
ENV POSTGRES_DB weather_manager_data
RUN mkdir /var/lib/postgresql/seeds
COPY /seeds/zip_codes_time_zones_lookup.csv /var/lib/postgresql/seeds
