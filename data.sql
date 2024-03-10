INSERT INTO public.passenger ("name", latitude, longitude) VALUES ('Passenger 1', 10.5000, -66.8800);
INSERT INTO public.passenger ("name", latitude, longitude) VALUES ('Passenger 2', 10.5000, -66.8800);


INSERT INTO public.driver ("name", status, latitude, longitude) VALUES ('Driver 1', 'ACTIVE', 10.5180, -66.8800);
INSERT INTO public.driver ("name", status, latitude, longitude) VALUES ('Driver 2', 'BUSY', 10.5360, -66.8800);
INSERT INTO public.driver ("name", status, latitude, longitude) VALUES ('Driver 3', 'ACTIVE', 10.5720, -66.8800);


-- {
--   "driverId": 1,
--   "passangerId": 2,
--   "originLatitude": 10.5000,
--   "originLongitude": -66.8800,
--   "destinationLatitude": 10.5180,
--   "destinationLongitude": -66.8800
-- }