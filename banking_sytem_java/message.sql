CREATE OR REPLACE FUNCTION create_message_after_operation() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO message (message, customer_id, amount)
    VALUES ('transfer succeeded', NEW.customer_id, NEW.amount);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER after_transaction_insert
AFTER INSERT ON operations
FOR EACH ROW
EXECUTE FUNCTION create_message_after_operation();